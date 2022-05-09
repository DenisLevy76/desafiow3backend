import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/adapters/driven/prisma/repositories/Account.reposotory';
import { BankOfficeRepository } from 'src/adapters/driven/prisma/repositories/BankOfficeRepository';
import { ClientRepository } from 'src/adapters/driven/prisma/repositories/Client.repository';
import { WithdrawUseCase } from 'src/core/application/useCases/WithdrawUseCase';

@Injectable()
export class WithdrawService {
  execute(
    accountBankOfficeNumber: string,
    accountNumber: string,
    amount: number,
  ) {
    try {
      const withdrawUseCase = new WithdrawUseCase(
        new AccountRepository(),
        new BankOfficeRepository(),
        new ClientRepository(),
      );
      return withdrawUseCase.execute(
        accountBankOfficeNumber,
        accountNumber,
        amount,
      );
    } catch (error) {
      return error;
    }
  }
}
