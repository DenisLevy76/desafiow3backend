import { UUID } from './valueObjects/uuid';

export abstract class Entity {
  constructor(protected _id?: UUID) {
    this._id = _id ?? UUID.generate();
  }
}
