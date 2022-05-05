import { inMemoryAccountRepo } from '../../../test/repositories/inMemoryAccountRepo';
import { inMemoryBankOfficeRepo } from '../../../test/repositories/inMemoryBankOfficeRepo';
import { WithdrawUseCase } from '../application/useCases/WithdrawUseCase';

describe('Withdraw tests', () => {
  it('should decrease 200 in account balance and return 800.5', async () => {
    const withdraw = new WithdrawUseCase(
      new inMemoryAccountRepo(),
      new inMemoryBankOfficeRepo(),
    );

    const newBalance = await withdraw.execute('321', '123', 200);

    expect(newBalance).toEqual(800.5);
  });
});
