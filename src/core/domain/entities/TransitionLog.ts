export class TransitionLog {
  constructor(
    readonly transitionDate: Date,
    readonly code: string,
    readonly bankOfficeId: string,
    readonly accountId: string,
    readonly transitionValue: number,
  ) {}
}
