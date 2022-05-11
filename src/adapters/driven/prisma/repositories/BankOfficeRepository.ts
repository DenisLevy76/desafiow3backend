import { BankOfficeDto } from '../../../../core/application/Dtos/BankOfficeDto';
import { IBankOfficeRepository } from '../../../../core/application/repositories/IBankOffice.repository';
import { prismaClient } from '../PrismaClient';

export class BankOfficeRepository implements IBankOfficeRepository {
  async findById(BankOfficeId: string): Promise<BankOfficeDto> {
    const bankOffice = await prismaClient.bankOffice.findFirst({
      where: { id: BankOfficeId },
    });

    return bankOffice;
  }
  async findByNumber(BankOfficeNumber: string): Promise<BankOfficeDto> {
    const bankOffice = await prismaClient.bankOffice.findFirst({
      where: { number: BankOfficeNumber },
    });

    return bankOffice || null;
  }
}
