import { Movement } from 'src/core/domain/entities/Movement';
import { AccountDto } from '../Dtos/AccountDto';

export interface IAccountRepository {
  findById(id: string): Promise<AccountDto | null>;

  findByBranchAndNumber(
    bankOffice: string,
    accountNumber: string,
  ): Promise<AccountDto | null>;

  movement(accountMovement: Movement): Promise<void>;
}
