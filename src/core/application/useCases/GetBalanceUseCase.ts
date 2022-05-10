import { Account } from 'src/core/domain/entities/Account';

export class GetBalanceUseCase {
  execute(account: Account): number {
    return account.getBalance();
  }
}
