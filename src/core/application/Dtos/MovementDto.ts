import { MovementType } from '../../domain/entities/enums/MovementType';

export type MovementDto = {
  id: string;
  type: MovementType;
  amount: number;
  accountId: string;
};
