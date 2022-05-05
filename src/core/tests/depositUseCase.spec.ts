import { inMemoryAccountRepo } from '../../../test/repositories/inMemoryAccountRepo';
import { inMemoryBankOfficeRepo } from '../../../test/repositories/inMemoryBankOfficeRepo';
import { DepositUseCase } from '../application/useCases/DepositUseCase';

describe('Deposit tests', () => {
  it('should increase 200 in account balance and return 1200.5', async () => {
    const deposit = new DepositUseCase(
      new inMemoryAccountRepo(),
      new inMemoryBankOfficeRepo(),
    );

    const newBalance = await deposit.execute('321', '123', 200);

    expect(newBalance).toEqual(1200.5);
  });
});
