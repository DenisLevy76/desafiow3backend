import { IAccountRepository } from '../../src/core/application/repositories/IAccount.repository';
import { Account } from '../../src/core/domain/entities/Account';
import { BankOffice } from '../../src/core/domain/entities/BankOffice';
import { Client } from '../../src/core/domain/entities/Client';

export class inMemoryAccountRepo implements IAccountRepository {
  public accounts: Account[] = [
    new Account(
      '123',
      new BankOffice('321', 'bancão'),
      1000.5,
      new Client('denis'),
    ),
  ];

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.find((account) => account._id.ID === id);

    return account || null;
  }
  async findByBranchAndNumber(
    bankOffice: string,
    accountNumber: string,
  ): Promise<Account | null> {
    const account = this.accounts.find(
      (account) =>
        account.bankOffice.number === bankOffice &&
        account.number === accountNumber,
    );

    return account || null;
  }
}
