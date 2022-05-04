import { Controller, Get } from '@nestjs/common';
import { WithdrawService } from '../../services/withdraw.service';
import { ROUTES } from '../../../../settings/routes';

@Controller(ROUTES.withdraw)
export class AccountController {
  constructor(private withdrawService: WithdrawService) {}

  @Get()
  withdraw() {
    return this.withdrawService.execute();
  }
}
