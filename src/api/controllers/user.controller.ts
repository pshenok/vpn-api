import joi from 'core/lib/app/Validator';
import { Request } from 'express';
import { UserService } from '../../domain/user/user.service';
import { AuthType } from '../auth/auth.types';
import { handler } from '../decorators';

export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @handler({
    description: 'Create user',
    method: 'POST',
    path: '/users',
    auth: AuthType.None,
    validate: {
			body: joi.object().keys({
				deviceId: joi.string().required(),
			}),
		},
    response: {
      200: joi.object(), // TODO: make it for swagger
    },
  })
  public async listLeagues(req: Request): Promise<object> {
    return this.userService.create(req.body.deviceId);
  }
}