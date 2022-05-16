import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../../driven/prisma/repositories/Account.reposotory';
import { BankOfficeRepository } from '../../../driven/prisma/repositories/BankOfficeRepository';
import { ClientRepository } from '../../../driven/prisma/repositories/Client.repository';
import { GetAccountAndValidateUseCase } from '../../../../core/application/useCases/GetAccountAndValidateUseCase';

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
