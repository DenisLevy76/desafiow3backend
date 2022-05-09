import { AccountDto } from '../../../../core/application/Dtos/AccountDto';
import { IAccountRepository } from '../../../../core/application/repositories/IAccount.repository';
import { prismaClient } from '../PrismaClient';
import { Movement } from 'src/core/domain/entities/Movement';

export class AccountRepository implements IAccountRepository {
  findById(id: string): Promise<AccountDto> {
    throw new Error('Method not implemented.');
  }

  async findByBranchAndNumber(
    bankOfficeId: string,
    accountNumber: string,
  ): Promise<AccountDto> {
    const bankOffice = await prismaClient.bankOffice.findUnique({
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

  async movement(accountMovement: Movement) {
    console.log(accountMovement);
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
