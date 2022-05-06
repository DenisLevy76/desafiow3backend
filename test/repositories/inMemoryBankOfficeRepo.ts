import { BankOfficeDto } from 'src/core/application/Dtos/BankOfficeDto';
import { IBankOfficeRepository } from '../../src/core/application/repositories/IBankOffice.repository';
import { BankOffice } from '../../src/core/domain/entities/BankOffice';

export class inMemoryBankOfficeRepo implements IBankOfficeRepository {
  private bankOffices: BankOffice[] = [new BankOffice('321', 'bancão')];

  async findByNumber(BankOfficeNumber: string): Promise<BankOfficeDto> {
    const bankOffice = this.bankOffices.find(
      (bankOffice) => bankOffice.number === BankOfficeNumber,
    );
    return {
      number: bankOffice.number,
      id: bankOffice._id.ID,
      name: bankOffice.name,
    };
  }
}
