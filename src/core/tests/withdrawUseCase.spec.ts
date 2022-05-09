import { inMemoryClientRepo } from '../../../test/repositories/inMemoryClientRepo';
import { inMemoryAccountRepo } from '../../../test/repositories/inMemoryAccountRepo';
import { inMemoryBankOfficeRepo } from '../../../test/repositories/inMemoryBankOfficeRepo';
import { WithdrawUseCase } from '../application/useCases/WithdrawUseCase';
import { Movement } from '../domain/entities/Movement';

const withdraw = new WithdrawUseCase(
  new inMemoryAccountRepo(),
  new inMemoryBankOfficeRepo(),
  new inMemoryClientRepo(),
);

describe('Withdraw tests', () => {
  it('should decrease 200 in account balance and return 800.5', async () => {
    const newBalance = await withdraw.execute('321', '123', 200);

    expect(newBalance).toBeInstanceOf(Movement);
    expect(newBalance.amount).toEqual(200);
    expect(newBalance.account.getBalance()).toEqual(800.5);
  });

  it('should throw a error of Insufficient balance', async () => {
    await expect(withdraw.execute('321', '123', 1005165)).rejects.toThrowError(
      'Insufficient balance.',
    );
  });

  it('should throw a error of Account does not exist.', async () => {
    await expect(
      withdraw.execute('321', '12ww3', 1005165),
    ).rejects.toThrowError('Account does not exist.');
  });

  it('should throw a error of Bank office does not exist.', async () => {
    await expect(
      withdraw.execute('32122', '123', 1005165),
    ).rejects.toThrowError('Bank office does not exist.');
  });
});
