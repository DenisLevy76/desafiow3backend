import { Module } from '@nestjs/common';
import { DepositController } from './http/controllers/deposit.controller';
import { GetBalanceController } from './http/controllers/getbalance.controller';
import { GetExtratoController } from './http/controllers/getExtrato.controller';
import { WithdrawController } from './http/controllers/withdraw.controller';
import { DepositService } from './http/services/deposit.service';
import { GetBalanceService } from './http/services/getbalance.service';
import { GetExtratoService } from './http/services/getExtrato.service';
import { WithdrawService } from './http/services/withdraw.service';

const httpControllers = [
  DepositController,
  GetBalanceController,
  WithdrawController,
  GetExtratoController,
];

const httpServices = [
  WithdrawService,
  DepositService,
  GetBalanceService,
  GetExtratoService,
];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [...httpServices],
})
export class DrivingModule {}
