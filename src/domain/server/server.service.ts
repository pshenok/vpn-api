import { IListResult } from "../domain.types";
import { Server } from "./server.entity";
import { IServerRepository } from "./server.repository.i";

export class ServerService {
  constructor(private serverRepository: IServerRepository) { }

  public async list(): Promise<IListResult<Server>> {
    return this.serverRepository.list();
  }
}