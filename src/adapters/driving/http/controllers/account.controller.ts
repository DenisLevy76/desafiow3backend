import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { WithdrawService } from '../../services/withdraw.service';
import { ROUTES } from '../../../../settings/routes';
import { WithdrawDto } from 'src/core/application/Dtos/WithdrawDto';
import { Response } from 'express';

@Controller(ROUTES.withdraw)
export class AccountController {
  constructor(private withdrawService: WithdrawService) {}

  @Post()
  withdraw(
    @Body() { accountBankOfficeNumber, accountNumber, amount }: WithdrawDto,
    @Res() response: Response,
  ) {
    try {
      const movement = this.withdrawService.execute(
        accountBankOfficeNumber,
        accountNumber,
        amount,
      );
      return response.send(HttpStatus.CREATED).send({ data: movement });
    } catch (error) {
      return response.send(HttpStatus.BAD_GATEWAY).send({ error });
    }
  }
}
