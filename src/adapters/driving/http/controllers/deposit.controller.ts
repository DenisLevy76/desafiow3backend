import { Body, Controller, HttpStatus, Patch, Res } from '@nestjs/common';
import { ROUTES } from '../../../../settings/routes';
import { Response } from 'express';
import { DepositService } from '../../services/deposit.service';
import { DepositDto } from '../../../../core/application/Dtos/DepositDto';

@Controller()
export class DepositController {
  constructor(private depositService: DepositService) {}

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
