import { Account } from '../../domain/entities/Account';

export interface IAccountRepository {
  findById(id: string): Promise<Account | null>;

  findByBranchAndNumber(
    bankOffice: string,
    accountNumber: string,
  ): Promise<Account | null>;
}
