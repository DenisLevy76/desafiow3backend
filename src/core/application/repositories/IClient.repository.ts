import { ClientDto } from '../Dtos/ClientDto';

export interface IClientRepository {
  findById(clientId: string): Promise<ClientDto | null>;
}
