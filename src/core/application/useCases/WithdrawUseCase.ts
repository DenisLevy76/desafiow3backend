import { Account } from 'src/core/domain/entities/Account';
import { MovementType } from '../../domain/entities/enums/MovementType';
import { Movement } from '../../domain/entities/Movement';
import { IAccountRepository } from '../repositories/IAccount.repository';

export class WithdrawUseCase {
  constructor(private accountRepo: IAccountRepository) {}

  async execute(account: Account, amount: number): Promise<Movement> {
    if (account.getBalance() < amount) throw new Error('Insufficient balance.');

    const movement = account.Movement(MovementType.WITHDRAW, amount);
    await this.accountRepo.movement(movement);

    return movement;
  }
}
