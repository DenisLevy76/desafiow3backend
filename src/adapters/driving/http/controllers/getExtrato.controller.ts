import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ROUTES } from 'src/settings/routes';
import { GetExtratoService } from '../services/getExtrato.service';

@Controller()
export class GetExtratoController {
  constructor(private getExtratoService: GetExtratoService) {}
  @Get(ROUTES.bankStatement)
  async executionAsyncResource(
    @Query()
    {
      accountNumber,
      bankOfficeNumber,
      initialDate,
      finalDate,
    }: {
      accountNumber: string;
      bankOfficeNumber: string;
      initialDate: string;
      finalDate: string;
    },
    @Res() response: Response,
  ) {
    const extrato = await this.getExtratoService.execute(
      accountNumber,
      bankOfficeNumber,
      new Date(initialDate),
      new Date(finalDate),
    );

    return response.status(HttpStatus.OK).send({ data: extrato });
  }
}
