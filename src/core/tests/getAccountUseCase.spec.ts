import { inMemoryAccountRepo } from '../../../test/repositories/inMemoryAccountRepo';
import { inMemoryBankOfficeRepo } from '../../../test/repositories/inMemoryBankOfficeRepo';
import { inMemoryClientRepo } from '../../../test/repositories/inMemoryClientRepo';
import { GetAccountAndValidateUseCase } from '../application/useCases/GetAccountAndValidateUseCase';
import { Account } from '../domain/entities/Account';

const getAccountUseCase = new GetAccountAndValidateUseCase(
  new inMemoryAccountRepo(),
  new inMemoryBankOfficeRepo(),
  new inMemoryClientRepo(),
);

describe('getAccountUseCase', () => {
  it('Should return an account', async () => {
    const account = await getAccountUseCase.execute('321', '123');
    expect(account).toBeInstanceOf(Account);
  });

  it('should throw a error of Account does not exist.', async () => {
    await expect(
      getAccountUseCase.execute('321', '12ww3'),
    ).rejects.toThrowError('Account does not exist.');
  });

  it('should throw a error of Bank office does not exist.', async () => {
    await expect(
      getAccountUseCase.execute('32ww1', '123'),
    ).rejects.toThrowError('Bank office does not exist.');
  });
});
