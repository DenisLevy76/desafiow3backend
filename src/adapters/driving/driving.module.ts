import { Module } from '@nestjs/common';
import { AccountController } from './http/controllers/account.controller';
import { WithdrawService } from './services/withdraw.service';

const httpControllers = [AccountController];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [WithdrawService],
})
export class DrivingModule {}
