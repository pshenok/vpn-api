import joi from 'core/lib/app/Validator';
import { Request } from 'express';
import { handler } from '../decorators';
import { AuthType } from '../auth/auth.types';
import { RegionService } from '../../domain/region/region.service';


export class RegionController {

  constructor(
    private regionService: RegionService,
  ) { }

  @handler({
    description: 'List regions',
    method: 'GET',
    path: '/regions',
    auth: AuthType.None,
    validate: {},
    response: {
      200: joi.object(), // TODO: make it for swagger
    },
  })
  public async listLeagues(req: Request): Promise<object> {
    const result = await this.regionService.list();

    return {
      total: result.total,
      items: result.items,
    };
  }
}
