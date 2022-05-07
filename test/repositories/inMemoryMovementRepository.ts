import { MovementDto } from '../../src/core/application/Dtos/MovementDto';
import { IMovementRepository } from '../../src/core/application/repositories/IMovement.repository';
import { MovementType } from 'src/core/domain/entities/enums/MovementType';

export class inMemoryMovementRepo implements IMovementRepository {
  private Movements: MovementDto[] = [
    {
      id: '1123',
      accountId: '123',
      amount: 200,
      type: MovementType.WITHDRAW,
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
