import { BankOfficeDto } from '../Dtos/BankOfficeDto';

export interface IBankOfficeRepository {
  findByNumber(BankOfficeNumber: string): Promise<BankOfficeDto | null>;
  findById(BankOfficeId: string): Promise<BankOfficeDto | null>;
}
