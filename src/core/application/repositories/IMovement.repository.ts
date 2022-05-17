import { MovementDto } from '../Dtos/MovementDto';

export interface IMovementRepository {
  findAllByDateTimeRange(
    bankOfficeId: string,
    accountId: string,
    initialDate: Date,
    finalDate: Date,
  ): Promise<MovementDto[] | null>;
  save(movement: MovementDto): Promise<void>;
}
