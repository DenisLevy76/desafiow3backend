import { ClientDto } from '../../src/core/application/Dtos/ClientDto';
import { IClientRepository } from '../../src/core/application/repositories/IClient.repository';

export class inMemoryClientRepo implements IClientRepository {
  private clients: ClientDto[] = [
    {
      id: '123',
      name: 'denis',
    },
  ];

  async findById(clientId: string): Promise<ClientDto> {
    const client = this.clients.find((client) => {
      return client.id === clientId;
    });

    if (!client) return null;

    return client;
  }
}
