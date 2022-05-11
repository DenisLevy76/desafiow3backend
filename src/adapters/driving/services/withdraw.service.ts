import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../driven/prisma/repositories/Account.reposotory';
import { BankOfficeRepository } from '../../driven/prisma/repositories/BankOfficeRepository';
import { ClientRepository } from '../../driven/prisma/repositories/Client.repository';
import { GetAccountAndValidateUseCase } from '../../../core/application/useCases/GetAccountAndValidateUseCase';
import { WithdrawUseCase } from '../../../core/application/useCases/WithdrawUseCase';
import { Movement } from '../../../core/domain/entities/Movement';

@Injectable()
export class WithdrawService {
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

    const withdrawUseCase = new WithdrawUseCase(new AccountRepository());
    const movement = await withdrawUseCase.execute(account, amount);

    return movement;
  }
}
