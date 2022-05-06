import { Account } from '../../domain/entities/Account';
import { BankOffice } from '../../domain/entities/BankOffice';
import { Client } from '../../domain/entities/Client';
import { UUID } from '../../domain/valueObjects/uuid';
import { MovementType } from '../../domain/entities/enums/MovementType';
import { Movement } from '../../domain/entities/Movement';
import { IAccountRepository } from '../repositories/IAccount.repository';
import { IBankOfficeRepository } from '../repositories/IBankOffice.repository';
import { IClientRepository } from '../repositories/IClient.repository';

export class DepositUseCase {
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

    const clientDto = await this.clientRepo.findById(accountDto.clientId);

    const account = new Account(
      accountDto.number,
      new BankOffice(
        bankOfficeDto.number,
        bankOfficeDto.name,
        UUID.generate(bankOfficeDto.id),
      ),
      Number(accountDto.balance),
      new Client(clientDto.name, UUID.generate(clientDto.id)),
      UUID.generate(accountDto.id),
    );

    account.Movement(MovementType.DEPOSIT, amount);

    return new Movement(account, MovementType.DEPOSIT, amount);
  }
}
