import { Entity } from '../Entity';
import { UUID } from '../valueObjects/uuid';

export class Client extends Entity {
  readonly _id?: UUID;

  constructor(readonly name: string, _id?: UUID) {
    super(_id);
  }
}
