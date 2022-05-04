import { IAccountRepository } from '../repositories/IAccount.repository';
import { IBankOfficeRepository } from '../repositories/IBankOffice.repository';

export class WithdrawUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private bankOfficeRepo: IBankOfficeRepository,
  ) {}

  async execute(
    accountBankOfficeNumber: string,
    accountNumber: string,
    amount: number,
  ) {
    const bankOffice = await this.bankOfficeRepo.findByNumber(
      accountBankOfficeNumber,
    );

    if (!bankOffice) throw new Error('Bank office does not exist.');

    const account = await this.accountRepo.findByBranchAndNumber(
      bankOffice.number,
      accountNumber,
    );

    if (!account) throw new Error('Account does not exist.');

    if (account.getBalance() < amount) throw new Error('Insufficient balance.');

    if (account) account.Movement('withdraw', amount);
  }
}
