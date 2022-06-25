import joi from 'core/lib/app/Validator';
import { Request } from 'express';
import { handler } from '../decorators';
import { AuthType } from '../auth/auth.types';
import { ServerService } from '../../domain/server/server.service';


export class ServerController {

  constructor(
    private serverService: ServerService,
  ) { }

  @handler({
    description: 'List servers',
    method: 'GET',
    path: '/servers',
    auth: AuthType.None,
    validate: {},
    response: {
      200: joi.object(), // TODO: make it for swagger
    },
  })
  public async listLeagues(req: Request): Promise<object> {
    const result = await this.serverService.list();

    return {
      total: result.total,
      items: result.items,
    };
  }
}
