import { Decimal } from '@prisma/client/runtime';

export type AccountDto = {
  balance: Decimal | number;
  bankOfficeId: string;
  clientId: string;
  number: string;
  id: string;
};
