import { IListResult } from "../domain.types";
import { Region } from "./region.entity";

export interface IRegionRepository {
  list(): Promise<IListResult<Region>>;
}