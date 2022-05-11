import { Account } from '../../domain/entities/Account';

export class GetBalanceUseCase {
  execute(account: Account): number {
    return account.getBalance();
  }
}
