import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/adapters/driven/prisma/repositories/Account.reposotory';
import { BankOfficeRepository } from 'src/adapters/driven/prisma/repositories/BankOfficeRepository';
import { ClientRepository } from 'src/adapters/driven/prisma/repositories/Client.repository';
import { DepositUseCase } from 'src/core/application/useCases/DepositUseCase';
import { Movement } from 'src/core/domain/entities/Movement';

@Injectable()
export class DepositService {
  async execute(
    accountBankOfficeNumber: string,
    accountNumber: string,
    amount: number,
  ): Promise<Movement> {
    try {
      const depositUseCase = new DepositUseCase(
        new AccountRepository(),
        new BankOfficeRepository(),
        new ClientRepository(),
      );
      return await depositUseCase.execute(
        accountBankOfficeNumber,
        accountNumber,
        amount,
      );
    } catch (error) {
      return error;
    }
  }
}
