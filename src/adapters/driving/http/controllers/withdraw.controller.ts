import { Body, Controller, HttpStatus, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { WithdrawDto } from '../../../../core/application/Dtos/WithdrawDto';
import { ROUTES } from '../../../../settings/routes';
import { WithdrawService } from '../../services/withdraw.service';

@Controller()
export class WithdrawController {
  constructor(private withdrawService: WithdrawService) {}
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
}
