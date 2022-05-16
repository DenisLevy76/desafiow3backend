import { Module } from '@nestjs/common';
import { DepositController } from './http/controllers/deposit.controller';
import { GetBalanceController } from './http/controllers/getbalance.controller';
import { WithdrawController } from './http/controllers/withdraw.controller';
import { DepositService } from './http/services/deposit.service';
import { GetBalanceService } from './http/services/getbalance.service';
import { WithdrawService } from './http/services/withdraw.service';

const httpControllers = [
  DepositController,
  GetBalanceController,
  WithdrawController,
];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [WithdrawService, DepositService, GetBalanceService],
})
export class DrivingModule {}
