import { NotImplementedException } from '@nestjs/common';
import { AccountDto } from 'src/core/application/Dtos/AccountDto';
import { UUID } from '../../src/core/domain/valueObjects/uuid';
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
      new Client('denis', UUID.generate('123')),
    ),
  ];

  async findById(id: string): Promise<AccountDto | null> {
    throw new NotImplementedException();
  }

  async findByBranchAndNumber(
    bankOffice: string,
    accountNumber: string,
  ): Promise<AccountDto | null> {
    const account = this.accounts.find(
      (account) =>
        account.bankOffice.number === bankOffice &&
        account.number === accountNumber,
    );

    if (!account) return null;

    return (
      {
        balance: account.getBalance(),
        clientId: account.owner._id.ID,
        id: account._id.ID,
        number: account.number,
        bankOfficeId: account.bankOffice._id.ID,
      } || null
    );
  }
}
