import { inMemoryBankOfficeRepo } from '../../../test/repositories/inMemoryBankOfficeRepo';
import { inMemoryClientRepo } from '../../../test/repositories/inMemoryClientRepo';
import { inMemoryAccountRepo } from '../../../test/repositories/inMemoryAccountRepo';
import { GetAccountAndValidateUseCase } from '../application/useCases/GetAccountAndValidateUseCase';
import { WithdrawUseCase } from '../application/useCases/WithdrawUseCase';
import { Movement } from '../domain/entities/Movement';

const withdraw = new WithdrawUseCase(new inMemoryAccountRepo());
const getAccountUseCase = new GetAccountAndValidateUseCase(
  new inMemoryAccountRepo(),
  new inMemoryBankOfficeRepo(),
  new inMemoryClientRepo(),
);

describe('Withdraw tests', () => {
  it('should decrease 200 in account balance and return 800.5', async () => {
    const account = await getAccountUseCase.execute('321', '123');

    const newBalance = await withdraw.execute(account, 200);

    expect(newBalance).toBeInstanceOf(Movement);
    expect(newBalance.amount).toEqual(200);
    expect(newBalance.account.getBalance()).toEqual(800.5);
  });

  it('should throw a error of Insufficient balance', async () => {
    try {
      const account = await getAccountUseCase.execute('321', '123');
      await withdraw.execute(account, 1005165);
    } catch (error) {
      expect(error.message).toBe('Insufficient balance.');
    }
  });
});
