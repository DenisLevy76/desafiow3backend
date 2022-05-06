import { randomUUID } from 'crypto';

export class UUID {
  constructor(readonly ID: string) {
    this.ID = ID;
  }

  static generate(id?: string) {
    return new UUID(id || randomUUID());
  }
}
