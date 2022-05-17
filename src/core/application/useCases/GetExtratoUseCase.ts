import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Account } from 'src/core/domain/entities/Account';
import { MovementType } from 'src/core/domain/entities/enums/MovementType';
import { IMovementRepository } from '../repositories/IMovement.repository';

export class GetExtratoUseCase {
  constructor(private movementRepo: IMovementRepository) {}
  async execute(
    account: Account,
    initialDate: Date,
    finalDate: Date,
  ): Promise<string[]> {
    if (finalDate < initialDate)
      throw new BadRequestException('Invalid date range.');

    const movements = await this.movementRepo.findAllByDateTimeRange(
      account.bankOffice._id.ID,
      account._id.ID,
      initialDate,
      finalDate,
    );

    if (!movements || movements.length === 0)
      throw new NotFoundException('Not found.');

    const movementsList = movements.map((movement) =>
      movement.type === MovementType.DEPOSIT
        ? `(${String(movement.created_at.getDate()).padStart(2, '0')}/${String(
            movement.created_at.getMonth() + 1,
          ).padStart(2, '0')}/${movement.created_at.getFullYear()}) +${
            movement.amount
          }`
        : `(${String(movement.created_at.getDate()).padStart(2, '0')}/${String(
            movement.created_at.getMonth() + 1,
          ).padStart(2, '0')}/${movement.created_at.getFullYear()}) -${
            movement.amount
          }`,
    );

    return movementsList;
  }
}
