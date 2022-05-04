import { Module } from '@nestjs/common';
import { AccountController } from './http/controllers/account.controller';
import { WithdrawService } from './services/withdraw.service';

const httpModules = [AccountController];

@Module({
  imports: [],
  controllers: [...httpModules],
  providers: [WithdrawService],
})
export class DrivingModule {}
