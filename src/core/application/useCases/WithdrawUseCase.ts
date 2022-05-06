import { Account } from 'src/core/domain/entities/Account';
import { BankOffice } from 'src/core/domain/entities/BankOffice';
import { Client } from 'src/core/domain/entities/Client';
import { UUID } from 'src/core/domain/valueObjects/uuid';
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

    const bankOffice = new BankOffice(
      bankOfficeDto.number,
      bankOfficeDto.name,
      UUID.generate(bankOfficeDto.id),
    );

    const accountDto = await this.accountRepo.findByBranchAndNumber(
      bankOffice.number,
      accountNumber,
    );

    if (!accountDto) throw new Error('Account does not exist.');

    if (accountDto.balance < amount) throw new Error('Insufficient balance.');

    const clientDto = await this.clientRepo.findById(accountDto.id);

    const client = new Client(clientDto.name, UUID.generate(clientDto.id));

    const account = new Account(
      accountDto.number,
      bankOffice,
      Number(accountDto.balance),
      client,
      UUID.generate(accountDto.id),
    );

    account.Movement(MovementType.WITHDRAW, amount);

    return new Movement(account, MovementType.WITHDRAW, amount);
  }
}
