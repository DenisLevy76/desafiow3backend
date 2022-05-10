import { Account } from '../../domain/entities/Account';
import { MovementType } from '../../domain/entities/enums/MovementType';
import { Movement } from '../../domain/entities/Movement';
import { IAccountRepository } from '../repositories/IAccount.repository';
export class DepositUseCase {
  constructor(private accountRepo: IAccountRepository) {}

  async execute(account: Account, amount: number): Promise<Movement> {
    const movement = account.Movement(MovementType.DEPOSIT, amount);
    await this.accountRepo.movement(movement);

    return movement;
  }
}
