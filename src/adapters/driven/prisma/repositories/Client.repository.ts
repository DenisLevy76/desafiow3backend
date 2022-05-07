import { ClientDto } from 'src/core/application/Dtos/ClientDto';
import { IClientRepository } from 'src/core/application/repositories/IClient.repository';
import { prismaClient } from '../PrismaClient';

export class ClientRepository implements IClientRepository {
  async findById(clientId: string): Promise<ClientDto> {
    const client = await prismaClient.client.findFirst({
      where: { id: clientId },
    });

    return client || null;
  }
}
