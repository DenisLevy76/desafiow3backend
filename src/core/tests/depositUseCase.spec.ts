import { inMemoryClientRepo } from '../../../test/repositories/inMemoryClientRepo';
import { inMemoryAccountRepo } from '../../../test/repositories/inMemoryAccountRepo';
import { inMemoryBankOfficeRepo } from '../../../test/repositories/inMemoryBankOfficeRepo';
import { DepositUseCase } from '../application/useCases/DepositUseCase';
import { Movement } from '../domain/entities/Movement';

const deposit = new DepositUseCase(
  new inMemoryAccountRepo(),
  new inMemoryBankOfficeRepo(),
  new inMemoryClientRepo(),
);

describe('Deposit tests', () => {
  it('should increase 200 in account balance and return 1200.5', async () => {
    const newBalance = await deposit.execute('321', '123', 200);

    expect(newBalance).toBeInstanceOf(Movement);
    expect(newBalance.type).toBe('deposit');
    expect(newBalance.amount).toBe(200);
    expect(newBalance.account.getBalance()).toBe(1200.5);
  });

  it('Should throw an error of Account does not existe', async () => {
    await expect(deposit.execute('321', '1223', 200)).rejects.toThrowError(
      'Account does not exist.',
    );
  });

  it('Should throw an error of Bank office does not existe', async () => {
    await expect(deposit.execute('3221', '123', 200)).rejects.toThrowError(
      'Bank office does not exist.',
    );
  });
});
