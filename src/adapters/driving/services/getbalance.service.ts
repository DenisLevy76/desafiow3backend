import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/adapters/driven/prisma/repositories/Account.reposotory';
import { BankOfficeRepository } from 'src/adapters/driven/prisma/repositories/BankOfficeRepository';
import { ClientRepository } from 'src/adapters/driven/prisma/repositories/Client.repository';
import { GetAccountAndValidateUseCase } from 'src/core/application/useCases/GetAccountAndValidateUseCase';

@Injectable()
export class GetBalanceService {
  async execute(accountNumber: string, accountBankOfficeNumber: string) {
    const getAccountAndValidateUseCase = new GetAccountAndValidateUseCase(
      new AccountRepository(),
      new BankOfficeRepository(),
      new ClientRepository(),
    );

    const account = await getAccountAndValidateUseCase.execute(
      accountNumber,
      accountBankOfficeNumber,
    );

    return account.getBalance();
  }
}
