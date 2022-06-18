import { PrismaClient } from '@prisma/client';
import { Logger } from 'core/lib/app/Logger';
import { IAsyncInit } from 'core/lib/IAsyncInit';
import { IConfigInfraDb } from 'core/lib/IConfigInfraDb';
import stringify from 'fast-safe-stringify';


export class DB implements IAsyncInit {
	public client!: PrismaClient;
	protected cfg: IConfigInfraDb['infra']['db'];

	constructor(
		protected logger: Logger,
		protected config: IConfigInfraDb,
	) {
		this.cfg = this.config.infra.db;
	}

	public async init(): Promise<void> {
		try {
			this.logger.info(`Connecting to DB ${this.cfg.user}@${this.cfg.host}:${this.cfg.port}/${this.cfg.db}`);

			this.client = new PrismaClient({
				log: [
					{ level: 'query', emit: 'event' },
					{ level: 'warn', emit: 'event' },
					{ level: 'info', emit: 'event' },
					{ level: 'error', emit: 'event' },
				],
				errorFormat: 'colorless',
			});


			// TODO: problem, these prisma logs don't have traceId
			//  need somehow to get here traceId from logger's context (through cls-hooked module), which increments with each request
			this.client.$on<any>('query', async (e: any) => {
				this.logger.info('sql query', {
					step: 'data',
					target: this.cfg.db,
					data: {
						query: e.query || '',
						params: e.params.length ? e.params : '',
						duration: e.duration || '',
					},
				});
			});
			this.client.$on<any>('warn', async (e: any) => {
				this.logger.warn('database', {
					step: 'warn',
					target: this.cfg.db,
					data: {
						message: e.message || '',
					},
				});
			});
			this.client.$on<any>('info', async (e: any) => {
				this.logger.info('database', {
					step: 'info',
					target: this.cfg.db,
					data: {
						message: e.message || '',
					},
				});
			});
			this.client.$on<any>('error', async (e: any) => {
				this.logger.error('database', {
					step: 'error',
					target: this.cfg.db,
					data: {
						message: e.message || '',
					},
					error: e.message,
				});
			});


			await this.client.$connect();

			this.logger.info('Connected to DB');

		} catch (err) {
			this.logger.error(`Failed to connect to DB: ${stringify(err)}`);

			throw err;
		}
	}

	public async start(): Promise<void> {
		// do nothing
	}

	public async stop(): Promise<void> {
		this.logger.info('Disconnecting from DB');
		await this.client.$disconnect();
		this.logger.info('Disconnected from DB');
	}
}

