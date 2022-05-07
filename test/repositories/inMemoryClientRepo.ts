import { UUID } from '../../src/core/domain/valueObjects/uuid';
import { ClientDto } from '../../src/core/application/Dtos/ClientDto';
import { IClientRepository } from '../../src/core/application/repositories/IClient.repository';
import { Client } from '../../src/core/domain/entities/Client';

export class inMemoryClientRepo implements IClientRepository {
  private clients: Client[] = [new Client('denis', UUID.generate('123'))];

  async findById(clientId: string): Promise<ClientDto> {
    const client = this.clients.find((client) => {
      return client._id.ID === clientId;
    });

    if (!client) return null;

    return {
      id: client._id.ID,
      name: client.name,
    };
  }
}
