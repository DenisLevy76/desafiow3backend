import { Module } from '@nestjs/common';
import { AccountController } from './http/controllers/account.controller';
import { DepositService } from './services/deposit.service';
import { WithdrawService } from './services/withdraw.service';

const httpControllers = [AccountController];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [WithdrawService, DepositService],
})
export class DrivingModule {}
