import { AccountDto } from 'src/core/application/Dtos/AccountDto';
import { IAccountRepository } from '../../../../core/application/repositories/IAccount.repository';
import { prismaClient } from '../PrismaClient';

export class AccountRepository implements IAccountRepository {
  findById(id: string): Promise<AccountDto> {
    throw new Error('Method not implemented.');
  }

  async findByBranchAndNumber(
    bankOfficeNumber: string,
    accountNumber: string,
  ): Promise<AccountDto> {
    const bankOffice = await prismaClient.bankOffice.findFirst({
      where: { number: bankOfficeNumber },
    });

    const account = await prismaClient.account.findFirst({
      where: { number: accountNumber, bankOffice: bankOffice },
    });

    return account;
  }
}
