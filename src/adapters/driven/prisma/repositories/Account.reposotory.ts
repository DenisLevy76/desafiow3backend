import { AccountDto } from 'src/core/application/Dtos/AccountDto';
import { IAccountRepository } from '../../../../core/application/repositories/IAccount.repository';
import { prismaClient } from '../PrismaClient';

export class AccountRepository implements IAccountRepository {
  findById(id: string): Promise<AccountDto> {
    throw new Error('Method not implemented.');
  }

  async findByBranchAndNumber(
    bankOfficeId: string,
    accountNumber: string,
  ): Promise<AccountDto> {
    const bankOffice = await prismaClient.bankOffice.findFirst({
      where: { id: bankOfficeId },
    });

    if (!bankOffice) return null;

    const account = await prismaClient.account.findFirst({
      where: {
        number: accountNumber,
        bankOfficeId: bankOffice.id,
      },
    });

    if (!account) return null;

    return account;
  }
}
