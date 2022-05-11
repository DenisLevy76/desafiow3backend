import { AccountDto } from '../../../../core/application/Dtos/AccountDto';
import { IAccountRepository } from '../../../../core/application/repositories/IAccount.repository';
import { prismaClient } from '../PrismaClient';
import { Movement } from '../../../../core/domain/entities/Movement';

export class AccountRepository implements IAccountRepository {
  async findById(id: string): Promise<AccountDto> {
    return prismaClient.account.findUnique({ where: { id } });
  }

  async findByBranchAndNumber(
    bankOfficeNumber: string,
    accountNumber: string,
  ): Promise<AccountDto> {
    const bankOffice = await prismaClient.bankOffice.findFirst({
      where: { number: bankOfficeNumber },
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

  async movement(accountMovement: Movement) {
    await prismaClient.account.update({
      where: { id: accountMovement.account._id.ID },
      data: {
        balance: accountMovement.account.getBalance(),
      },
    });

    await prismaClient.movement.create({
      data: {
        id: accountMovement._id.ID,
        amount: accountMovement.amount,
        type: accountMovement.type,
        accountId: accountMovement.account._id.ID,
      },
    });
  }
}
