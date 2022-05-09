import { Entity } from '../Entity';
import { UUID } from '../valueObjects/uuid';
import { Account } from './Account';
import { MovementType } from './enums/MovementType';

export class Movement extends Entity {
  readonly _id?: UUID;
  readonly createdAt?: Date;

  constructor(
    readonly account: Account,
    readonly type: MovementType,
    readonly amount: number,
    createdAt?: Date,
    _id?: UUID,
  ) {
    super(_id);
    createdAt = createdAt;
  }
}
