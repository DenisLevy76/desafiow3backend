import { Account } from '../../domain/entities/Account';
import { MovementType } from '../../domain/entities/enums/MovementType';
import { Movement } from '../../domain/entities/Movement';
import { IAccountRepository } from '../repositories/IAccount.repository';
import { IBankOfficeRepository } from '../repositories/IBankOffice.repository';
import { IClientRepository } from '../repositories/IClient.repository';

export class WithdrawUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private bankOfficeRepo: IBankOfficeRepository,
    private clientRepo: IClientRepository,
  ) {}

  async execute(
    accountBankOfficeNumber: string,
    accountNumber: string,
    amount: number,
  ) {
    const bankOfficeDto = await this.bankOfficeRepo.findByNumber(
      accountBankOfficeNumber,
    );

    if (!bankOfficeDto) throw new Error('Bank office does not exist.');

    const accountDto = await this.accountRepo.findByBranchAndNumber(
      bankOfficeDto.number,
      accountNumber,
    );

    if (!accountDto) throw new Error('Account does not exist.');

    if (accountDto.balance < amount) throw new Error('Insufficient balance.');

    const clientDto = await this.clientRepo.findById(accountDto.clientId);

    if (!clientDto) throw new Error('Client does not exist.');

    const account = Account.createByDto(accountDto, clientDto, bankOfficeDto);

    account.Movement(MovementType.WITHDRAW, amount);

    return new Movement(account, MovementType.WITHDRAW, amount);
  }
}
