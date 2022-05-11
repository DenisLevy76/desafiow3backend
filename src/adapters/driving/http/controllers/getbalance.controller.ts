import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetBalanceDto } from 'src/core/application/Dtos/getBalanceDto';
import { ROUTES } from 'src/settings/routes';
import { GetBalanceService } from '../../services/getbalance.service';

@Controller()
export class GetBalanceController {
  constructor(private getBalanceService: GetBalanceService) {}
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
}
