import { UUID } from '../../src/core/domain/valueObjects/uuid';
import { ClientDto } from '../../src/core/application/Dtos/ClientDto';
import { IClientRepository } from '../../src/core/application/repositories/IClient.repository';
import { Client } from '../../src/core/domain/entities/Client';

export class inMemoryClientRepo implements IClientRepository {
  private bankOffices: Client[] = [new Client('denis', UUID.generate('123'))];

  async findById(clientId: string): Promise<ClientDto> {
    const bankOffice = this.bankOffices.find(
      (client) => client._id.ID === clientId,
    );
    return {
      id: bankOffice._id.ID,
      name: bankOffice.name,
    };
  }
}
