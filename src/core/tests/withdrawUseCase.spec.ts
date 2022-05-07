import { inMemoryClientRepo } from '../../../test/repositories/inMemoryClientRepo';
import { inMemoryAccountRepo } from '../../../test/repositories/inMemoryAccountRepo';
import { inMemoryBankOfficeRepo } from '../../../test/repositories/inMemoryBankOfficeRepo';
import { WithdrawUseCase } from '../application/useCases/WithdrawUseCase';
import { Movement } from '../domain/entities/Movement';

describe('Withdraw tests', () => {
  it('should decrease 200 in account balance and return 800.5', async () => {
    const withdraw = new WithdrawUseCase(
      new inMemoryAccountRepo(),
      new inMemoryBankOfficeRepo(),
      new inMemoryClientRepo(),
    );

    const newBalance = await withdraw.execute(
      '78e066cd-493b-495e-a328-06adc01366be',
      '123',
      200,
    );

    expect(newBalance).toBeInstanceOf(Movement);
    expect(newBalance.amount).toEqual(200);
    expect(newBalance.account.getBalance()).toEqual(800.5);
  });

  it('should throw a error of Insufficient balance', async () => {
    const withdraw = new WithdrawUseCase(
      new inMemoryAccountRepo(),
      new inMemoryBankOfficeRepo(),
      new inMemoryClientRepo(),
    );

    try {
      await withdraw.execute(
        '78e066cd-493b-495e-a328-06adc01366be',
        '123',
        1005165,
      );
    } catch (error) {
      expect(error.message).toBe('Insufficient balance.');
    }
  });
});
