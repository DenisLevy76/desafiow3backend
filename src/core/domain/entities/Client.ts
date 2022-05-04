import { Entity } from '../Entity';
import { UUID } from '../valueObjects/uuid';
import { Account } from './Account';

export class Client extends Entity {
  readonly _id?: UUID;

  constructor(readonly name: string, readonly account: Account, _id?: UUID) {
    super(_id);
  }
}
