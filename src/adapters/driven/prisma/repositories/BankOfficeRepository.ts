import { BankOfficeDto } from 'src/core/application/Dtos/BankOfficeDto';
import { IBankOfficeRepository } from 'src/core/application/repositories/IBankOffice.repository';
import { prismaClient } from '../PrismaClient';

export class BankOfficeRepository implements IBankOfficeRepository {
  async findByNumber(BankOfficeNumber: string): Promise<BankOfficeDto> {
    const bankOffice = await prismaClient.bankOffice.findFirst({
      where: { number: BankOfficeNumber },
    });

    return bankOffice || null;
  }
}
