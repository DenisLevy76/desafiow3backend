import { Injectable } from '@nestjs/common';

@Injectable()
export class WithdrawService {
  execute() {
    return { res: 'hello world' };
  }
}
