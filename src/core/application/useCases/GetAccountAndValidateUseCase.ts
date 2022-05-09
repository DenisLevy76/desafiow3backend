import { Account } from '../../domain/entities/Account';
import { IAccountRepository } from '../repositories/IAccount.repository';
import { IBankOfficeRepository } from '../repositories/IBankOffice.repository';
import { IClientRepository } from '../repositories/IClient.repository';

export class GetAccountAndValidateUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private bankOfficeRepo: IBankOfficeRepository,
    private clientRepo: IClientRepository,
  ) {}

  async execute(
    accountBankOfficeNumber: string,
    accountNumber: string,
  ): Promise<Account> {
    const bankOfficeDto = await this.bankOfficeRepo.findByNumber(
      accountBankOfficeNumber,
    );

    if (!bankOfficeDto) throw new Error('Bank office does not exist.');

    const accountDto = await this.accountRepo.findByBranchAndNumber(
      bankOfficeDto.id,
      accountNumber,
    );

    if (!accountDto) throw new Error('Account does not exist.');

    const clientDto = await this.clientRepo.findById(accountDto.clientId);

    if (!clientDto) throw new Error('Client does not exist.');

    const account = Account.createByDto(accountDto, clientDto, bankOfficeDto);

    return account;
  }
}
