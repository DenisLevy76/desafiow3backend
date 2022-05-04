import { Entity } from '../Entity';
import { UUID } from '../valueObjects/uuid';

export class BankOffice extends Entity {
  readonly _id?: UUID;

  constructor(readonly number: string, readonly name: string, _id?: UUID) {
    super(_id);
  }
}
