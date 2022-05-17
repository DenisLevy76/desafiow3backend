import { MovementType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export type MovementDto = {
  id: string;
  type: MovementType;
  amount: Decimal;
  accountId: string;
  created_at: Date;
};
