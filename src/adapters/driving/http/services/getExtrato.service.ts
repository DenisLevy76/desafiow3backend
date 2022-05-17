import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/adapters/driven/prisma/repositories/Account.reposotory';
import { BankOfficeRepository } from 'src/adapters/driven/prisma/repositories/BankOfficeRepository';
import { ClientRepository } from 'src/adapters/driven/prisma/repositories/Client.repository';
import { MovementRepository } from 'src/adapters/driven/prisma/repositories/Movement.repository';
import { GetAccountAndValidateUseCase } from 'src/core/application/useCases/GetAccountAndValidateUseCase';
import { GetExtratoUseCase } from 'src/core/application/useCases/GetExtratoUseCase';

@Injectable()
export class GetExtratoService {
  async execute(
    accountId: string,
    bankOfficeId: string,
    initialDate: Date,
    finalDate: Date,
  ) {
    const getAccountUseCase = new GetAccountAndValidateUseCase(
      new AccountRepository(),
      new BankOfficeRepository(),
      new ClientRepository(),
    );
    console.log(accountId);
    console.log(bankOfficeId);
    console.log(initialDate);
    console.log(finalDate);
    const account = await getAccountUseCase.execute(bankOfficeId, accountId);

    const getExtratoUseCase = new GetExtratoUseCase(new MovementRepository());
    const extrato = getExtratoUseCase.execute(account, initialDate, finalDate);

    return extrato;
  }
}
