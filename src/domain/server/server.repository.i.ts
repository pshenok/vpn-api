import { IListResult } from "../domain.types";
import { Server } from "./server.entity";

export interface IServerRepository {
  list(): Promise<IListResult<Server>>;
}