import { NotImplementedException } from '@nestjs/common';
import { AccountDto } from 'src/core/application/Dtos/AccountDto';
import { BankOfficeDto } from 'src/core/application/Dtos/BankOfficeDto';
import { Movement } from 'src/core/domain/entities/Movement';
import { IAccountRepository } from '../../src/core/application/repositories/IAccount.repository';

export class inMemoryAccountRepo implements IAccountRepository {
  public accounts: AccountDto[] = [
    {
      balance: 1000.5,
      bankOfficeId: '78e066cd-493b-495e-a328-06adc01366be',
      clientId: '123',
      id: 'b036e9fb-d47f-4f07-b3e0-7e01df37b32e',
      number: '123',
    },
  ];

  private bankOffices: BankOfficeDto[] = [
    {
      id: '78e066cd-493b-495e-a328-06adc01366be',
      name: 'bancão',
      number: '321',
    },
  ];

  async findById(id: string): Promise<AccountDto | null> {
    throw new NotImplementedException();
  }

  async findBankOfficesById(number: string): Promise<BankOfficeDto | null> {
    const bankOffice = this.bankOffices.find(
      (bankOffice) => bankOffice.number === number,
    );

    return bankOffice;
  }

  async findByBranchAndNumber(
    bankOfficeNumber: string,
    accountNumber: string,
  ): Promise<AccountDto | null> {
    const bankOffice = await this.findBankOfficesById(bankOfficeNumber);
    const account = this.accounts.find(
      (account) =>
        account.bankOfficeId === bankOffice.id &&
        account.number === accountNumber,
    );

    if (!account) return null;

    return account;
  }

  async movement(accountMovement: Movement): Promise<void> {
    null;
  }
}
