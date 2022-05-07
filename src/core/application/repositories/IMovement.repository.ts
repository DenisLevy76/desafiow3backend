import { MovementDto } from '../Dtos/MovementDto';

export interface IMovementRepository {
  findById(MovementId: string): Promise<MovementDto | null>;
  save(movement: MovementDto): Promise<void>;
}
