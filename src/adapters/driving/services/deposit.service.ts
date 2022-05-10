import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/adapters/driven/prisma/repositories/Account.reposotory';
import { BankOfficeRepository } from 'src/adapters/driven/prisma/repositories/BankOfficeRepository';
import { ClientRepository } from 'src/adapters/driven/prisma/repositories/Client.repository';
import { DepositUseCase } from 'src/core/application/useCases/DepositUseCase';
import { GetAccountAndValidateUseCase } from 'src/core/application/useCases/GetAccountAndValidateUseCase';
import { Movement } from 'src/core/domain/entities/Movement';

@Injectable()
export class DepositService {
  async execute(
    accountBankOfficeNumber: string,
    accountNumber: string,
    amount: number,
  ): Promise<Movement> {
    const accountUseCase = new GetAccountAndValidateUseCase(
      new AccountRepository(),
      new BankOfficeRepository(),
      new ClientRepository(),
    );
    const account = await accountUseCase.execute(
      accountBankOfficeNumber,
      accountNumber,
    );

    const depositUseCase = new DepositUseCase(new AccountRepository());
    const movement = await depositUseCase.execute(account, amount);

    return movement;
  }
}
