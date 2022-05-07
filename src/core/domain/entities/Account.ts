import { AccountDto } from 'src/core/application/Dtos/AccountDto';
import { BankOfficeDto } from 'src/core/application/Dtos/BankOfficeDto';
import { ClientDto } from 'src/core/application/Dtos/ClientDto';
import { Entity } from '../Entity';
import { UUID } from '../valueObjects/uuid';
import { BankOffice } from './BankOffice';
import { Client } from './Client';

export class Account extends Entity {
  readonly _id?: UUID;

  constructor(
    readonly number: string,
    readonly bankOffice: BankOffice,
    private balance: number,
    readonly owner: Client,
    _id?: UUID,
  ) {
    super(_id);
  }

  Movement(type: 'deposit' | 'withdraw', amount: number) {
    const movementType = {
      deposit: () => (this.balance += amount),
      withdraw: () => (this.balance -= amount),
    };

    movementType[type]();

    return this.balance;
  }

  getBalance() {
    return this.balance;
  }

  static createByDto(
    accountDto: AccountDto,
    clientDto: ClientDto,
    bankOfficeDto: BankOfficeDto,
  ) {
    return new Account(
      accountDto.number,
      new BankOffice(
        bankOfficeDto.number,
        bankOfficeDto.name,
        UUID.generate(bankOfficeDto.id),
      ),
      Number(accountDto.balance),
      new Client(clientDto.name, UUID.generate(clientDto.id)),
    );
  }
}