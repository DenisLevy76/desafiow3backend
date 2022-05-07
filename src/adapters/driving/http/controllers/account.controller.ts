import { Body, Controller, Post } from '@nestjs/common';
import { WithdrawService } from '../../services/withdraw.service';
import { ROUTES } from '../../../../settings/routes';
import { WithdrawDto } from 'src/core/application/Dtos/WithdrawDto';

@Controller(ROUTES.withdraw)
export class AccountController {
  constructor(private withdrawService: WithdrawService) {}

  @Post()
  withdraw(
    @Body() { accountBankOfficeNumber, accountNumber, amount }: WithdrawDto,
  ) {
    return this.withdrawService.execute(
      accountBankOfficeNumber,
      accountNumber,
      amount,
    );
  }
}
