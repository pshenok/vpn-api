import joi from 'core/lib/app/Validator';
import { handler } from '../decorators';
import { DefaultAuthType } from 'core/lib/interfaces/auth.types';


export class PingController {

	@handler({
		description: 'Simple ping',
		method: 'GET',
		path: '/ping',
		auth: DefaultAuthType.None,
		validate: {},
		response: {
			200: joi.object().keys({
				data: joi.object().keys({
					ping: joi.string(),
					time: joi.string(),
				}),
			}),
		},
	})
	public async simplePing(): Promise<object> {
		return {
			ping: 'pong',
			time: new Date().toISOString(),
		};
	}

	@handler({
		description: 'Simple ping',
		method: 'POST',
		path: '/ping',
		auth: DefaultAuthType.None,
		validate: {
			body: joi.object().keys({
				str: joi.string(),
			}),
		},
		response: {
			200: joi.object().keys({
				data: joi.object().keys({
					ping: joi.string(),
					time: joi.string(),
				}),
			}),
		},
	})
	public async postPing(): Promise<object> {
		return {
			ping: 'pong',
			time: new Date().toISOString(),
		};
	}
}
