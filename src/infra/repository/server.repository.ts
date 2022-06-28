import { IServerRepository } from "../../domain/server/server.repository.i";
import { Server } from "../../domain/server/server.entity";
import { Server as ServerModel } from "@prisma/client";
import { IListResult } from "../../domain/domain.types";
import { DB } from "../DB"

export class ServerRepository implements IServerRepository {

  constructor(private db: DB) { }

  private toEntity (serverModel: ServerModel): Server {
		return new Server(serverModel);
	}

  public async list(): Promise<IListResult<Server>> {

    const servers = await this.db.client.server.findMany();

    if (!servers) {
      return {
        total: 0,
        items: [],
      };
    }

    return {
      total: servers.length,
      items: servers.map(item => (this.toEntity(item))),
    }
  }
}