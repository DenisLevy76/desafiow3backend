import { Module } from '@nestjs/common';
import { AccountController } from './http/controllers/account.controller';
import { DepositService } from './services/deposit.service';
import { GetBalanceService } from './services/getbalance.service';
import { WithdrawService } from './services/withdraw.service';

const httpControllers = [AccountController];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [WithdrawService, DepositService, GetBalanceService],
})
export class DrivingModule {}
