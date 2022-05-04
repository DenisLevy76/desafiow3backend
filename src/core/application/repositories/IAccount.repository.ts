import { Account } from '../../domain/entities/Account';

export interface IAccountRepository {
  findById(id: string): Promise<Account>;

  findByBranchAndNumber(
    branch: string,
    accountNumber: string,
  ): Promise<Account>;
}
