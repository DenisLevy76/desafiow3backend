import { BankOfficeDto } from 'src/core/application/Dtos/BankOfficeDto';
import { IBankOfficeRepository } from '../../src/core/application/repositories/IBankOffice.repository';

export class inMemoryBankOfficeRepo implements IBankOfficeRepository {
  private bankOffices: BankOfficeDto[] = [
    {
      id: '78e066cd-493b-495e-a328-06adc01366be',
      name: 'bancão',
      number: '321',
    },
  ];

  async findByNumber(BankOfficeNumber: string): Promise<BankOfficeDto> {
    const bankOffice = this.bankOffices.find(
      (bankOfficeList) => bankOfficeList.number === BankOfficeNumber,
    );

    if (!bankOffice) return null;

    return bankOffice;
  }

  async findById(BankOfficeId: string): Promise<BankOfficeDto> {
    const bankOffice = this.bankOffices.find(
      (bankOfficeList) => bankOfficeList.id === BankOfficeId,
    );

    if (!bankOffice) return null;

    return bankOffice;
  }
}
