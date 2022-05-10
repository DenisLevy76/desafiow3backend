import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { WithdrawService } from '../../services/withdraw.service';
import { ROUTES } from '../../../../settings/routes';
import { WithdrawDto } from 'src/core/application/Dtos/WithdrawDto';
import { Response } from 'express';
import { DepositService } from '../../services/deposit.service';
import { GetBalanceService } from '../../services/getbalance.service';
import { DepositDto } from 'src/core/application/Dtos/DepositDto';
import { GetBalanceDto } from 'src/core/application/Dtos/getBalanceDto';

@Controller()
export class AccountController {
  constructor(
    private withdrawService: WithdrawService,
    private depositService: DepositService,
    private getBalanceService: GetBalanceService,
  ) {}

  @Get(ROUTES.getAccountBalance)
  async getBalance(
    @Query() { accountBankOfficeNumber, accountNumber }: GetBalanceDto,
    @Res() response: Response,
  ) {
    const balance = await this.getBalanceService.execute(
      accountNumber,
      accountBankOfficeNumber,
    );
    return response
      .status(HttpStatus.FOUND)
      .send({ data: { accountBalance: balance } });
  }

  @Patch(ROUTES.withdraw)
  async withdraw(
    @Body() { accountBankOfficeNumber, accountNumber, amount }: WithdrawDto,
    @Res() response: Response,
  ) {
    const movement = await this.withdrawService.execute(
      accountBankOfficeNumber,
      accountNumber,
      amount,
    );
    return response.status(HttpStatus.CREATED).send({ data: movement });
  }

  @Patch(ROUTES.deposit)
  async deposit(
    @Body() { accountBankOfficeNumber, accountNumber, amount }: DepositDto,
    @Res() response: Response,
  ) {
    const movement = await this.depositService.execute(
      accountBankOfficeNumber,
      accountNumber,
      amount,
    );
    return response.status(HttpStatus.CREATED).send({ data: movement });
  }
}
