import { IRegionRepository } from "../../domain/region/region.repository.i";
import { Region } from "../../domain/region/region.entity";
import { Region as RegionModel } from "@prisma/client";
import { IListResult } from "../../domain/domain.types";
import { DB } from "../DB"

export class RegionRepository implements IRegionRepository {

  constructor(private db: DB) { }

  private toEntity (regionModel: RegionModel): Region {
		return new Region(regionModel);
	}

  public async list(): Promise<IListResult<Region>> {

    const regions = await this.db.client.region.findMany({
      include: {
        servers: true,
      },
    });

    if (!regions) {
      return {
        total: 0,
        items: [],
      };
    }

    return {
      total: regions.length,
      items: regions.map(item => (this.toEntity(item))),
    }
  }
}