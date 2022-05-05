import { BankOffice } from 'src/core/domain/entities/BankOffice';

export interface IBankOfficeRepository {
  findByNumber(BankOfficeNumber: string): Promise<BankOffice | null>;
}
