import { IListResult } from "../domain.types";
import { Region } from "./region.entity";
import { IRegionRepository } from "./region.repository.i";

export class RegionService {
  constructor(private regionRepository: IRegionRepository) { }

  public async list(): Promise<IListResult<Region>> {
    return this.regionRepository.list();
  }
}