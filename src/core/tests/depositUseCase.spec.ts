import { inMemoryBankOfficeRepo } from '../../../test/repositories/inMemoryBankOfficeRepo';
import { inMemoryClientRepo } from '../../../test/repositories/inMemoryClientRepo';
import { inMemoryAccountRepo } from '../../../test/repositories/inMemoryAccountRepo';
import { DepositUseCase } from '../application/useCases/DepositUseCase';
import { GetAccountAndValidateUseCase } from '../application/useCases/GetAccountAndValidateUseCase';
import { Movement } from '../domain/entities/Movement';
import { HttpException } from '@nestjs/common';

const deposit = new DepositUseCase(new inMemoryAccountRepo());
const getAccountUseCase = new GetAccountAndValidateUseCase(
  new inMemoryAccountRepo(),
  new inMemoryBankOfficeRepo(),
  new inMemoryClientRepo(),
);

describe('Deposit tests', () => {
  it('should increase 200 in account balance and return 1200.5', async () => {
    const account = await getAccountUseCase.execute('321', '123');

    const newBalance = await deposit.execute(account, 200);

    expect(newBalance).toBeInstanceOf(Movement);
    expect(newBalance.type).toBe('deposit');
    expect(newBalance.amount).toBe(200);
    expect(newBalance.account.getBalance()).toBe(1200.5);
  });

  it('Should throw an error of Account does not existe', async () => {
    try {
      const account = await getAccountUseCase.execute('321', '1232313');

      await deposit.execute(account, 200);
    } catch (error) {
      expect(error.message).toBe('Account does not exist.');
    }
  });

  it('Should throw an error of Bank office does not existe', async () => {
    try {
      const account = await getAccountUseCase.execute('32221', '123');
      await deposit.execute(account, 200);
    } catch (error) {
      expect(error.message).toBe('Bank office does not exist.');
    }
  });
});
