import { AccountDto } from '../Dtos/AccountDto';

export interface IAccountRepository {
  findById(id: string): Promise<AccountDto | null>;

  findByBranchAndNumber(
    bankOffice: string,
    accountNumber: string,
  ): Promise<AccountDto | null>;
}
