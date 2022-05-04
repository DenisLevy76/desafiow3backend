export class UUID {
  constructor(readonly ID: string) {
    this.ID = ID;
  }

  static generate() {
    return new UUID(crypto.randomUUID());
  }
}
