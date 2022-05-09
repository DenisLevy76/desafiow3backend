import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/adapters/driven/prisma/repositories/Account.reposotory';
import { BankOfficeRepository } from 'src/adapters/driven/prisma/repositories/BankOfficeRepository';
import { ClientRepository } from 'src/adapters/driven/prisma/repositories/Client.repository';
import { GetAccountAndValidateUseCase } from 'src/core/application/useCases/GetAccountAndValidateUseCase';
import { WithdrawUseCase } from 'src/core/application/useCases/WithdrawUseCase';
import { Movement } from 'src/core/domain/entities/Movement';

@Injectable()
export class WithdrawService {
  async execute(
    accountBankOfficeNumber: string,
    accountNumber: string,
    amount: number,
  ): Promise<Movement> {
    try {
      const accountUseCase = new GetAccountAndValidateUseCase(
        new AccountRepository(),
        new BankOfficeRepository(),
        new ClientRepository(),
      );
      const account = await accountUseCase.execute(
        accountBankOfficeNumber,
        accountNumber,
      );

      const withdrawUseCase = new WithdrawUseCase(new AccountRepository());
      const movement = await withdrawUseCase.execute(account, amount);

      return movement;
    } catch (error) {
      return error;
    }
  }
}
