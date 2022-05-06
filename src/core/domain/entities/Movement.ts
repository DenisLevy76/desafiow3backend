import { Entity } from '../Entity';
import { UUID } from '../valueObjects/uuid';
import { Account } from './Account';
import { MovementType } from './enums/MovementType';

export class Movement extends Entity {
  readonly _id?: UUID;

  constructor(
    readonly account: Account,
    readonly type: MovementType,
    readonly amount: number,
    _id?: UUID,
  ) {
    super(_id);
  }
}
