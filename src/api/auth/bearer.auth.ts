import { Request } from 'express';
import { IAuth } from 'core/lib/interfaces/auth.types';
import { WebError } from 'core/lib/interfaces/web/WebError';
import basicAuth from 'basic-auth';
import { Config } from '../../Config';
import { Logger } from 'core/lib/app/Logger';


export class BearerAuth implements IAuth {

	constructor(
		private config: Config,
		private logger: Logger,
	) { }

	public async credentials(req: Request): Promise<basicAuth.BasicAuthResult> {
		const credentials = basicAuth(req);

		if (credentials) {
			return credentials;

		} else {
			throw new WebError(401, 'UNAUTHENTICATED', 'No credentials');
		}
	}


	public async auth(req: Request, credentials: basicAuth.BasicAuthResult): Promise<Request['auth']> {
		this.logger.info('auth', {
			step: 'start',
			target: 'BASIC',
			ids: {
				user: credentials.name,
			},
		});

		this.logger.info('auth', {
			step: 'end',
			target: 'BASIC',
			ids: {
				user: credentials.name,
			},
		});

		return {
			user: credentials.name,
		};
	}
}
