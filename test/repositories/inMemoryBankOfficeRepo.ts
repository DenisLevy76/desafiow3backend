import { IBankOfficeRepository } from '../../src/core/application/repositories/IBankOffice.repository';
import { BankOffice } from '../../src/core/domain/entities/BankOffice';

export class inMemoryBankOfficeRepo implements IBankOfficeRepository {
  private bankOffices: BankOffice[] = [new BankOffice('321', 'bancão')];

  async findByNumber(BankOfficeNumber: string): Promise<BankOffice> {
    const bankOffice = this.bankOffices.find(
      (bankOffice) => bankOffice.number === BankOfficeNumber,
    );
    return bankOffice;
  }
}
