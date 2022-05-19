import { MovementDto } from '../../src/core/application/Dtos/MovementDto';
import { IMovementRepository } from '../../src/core/application/repositories/IMovement.repository';
import { MovementType } from 'src/core/domain/entities/enums/MovementType';
import { Decimal } from '@prisma/client/runtime';

export class inMemoryMovementRepo implements IMovementRepository {
  findAllByDateTimeRange(): Promise<MovementDto[]> {
    throw new Error('Method not implemented.');
  }
  private Movements: MovementDto[] = [
    {
      id: '1123',
      accountId: '123',
      amount: new Decimal(200),
      type: MovementType.WITHDRAW,
      created_at: new Date('05-12-2022'),
    },
  ];

  async findById(MovementId: string): Promise<MovementDto> {
    const Movement = this.Movements.find((Movement) => {
      return Movement.id === MovementId;
    });

    if (!Movement) return null;

    return Movement;
  }

  async save(movement: MovementDto): Promise<void> {
    this.Movements.push(movement);
  }
}
