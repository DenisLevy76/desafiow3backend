import { MovementDto } from 'src/core/application/Dtos/MovementDto';
import { IMovementRepository } from 'src/core/application/repositories/IMovement.repository';
import { prismaClient } from '../PrismaClient';

export class MovementRepository implements IMovementRepository {
  async findAllByDateTimeRange(
    bankOfficeId: string,
    accountId: string,
    initialDate: Date,
    finalDate: Date,
  ): Promise<MovementDto[]> {
    const movements = await prismaClient.movement.findMany({
      where: {
        account: {
          bankOfficeId: bankOfficeId,
          id: accountId,
        },
        created_at: {
          gte: initialDate,
          lt: finalDate,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return movements;
  }

  save(movement: MovementDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
