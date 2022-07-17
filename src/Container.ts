import 'reflect-metadata';
import { asClass, asValue, AwilixContainer, createContainer, InjectionMode } from 'awilix';
import { App } from 'core/lib/app/App';
import { Logger } from 'core/lib/app/Logger';
import { Config } from './Config';
import { Web } from './api/web';
import { Usage } from 'core/lib/app/plugins/Usage';
import { PingController } from './api/controllers/ping.controller';
import { ProbeController } from './api/controllers/probe.controller';
import { AuthType } from './api/auth/auth.types';
import { DefaultAuthType } from 'core/lib/interfaces/auth.types';
import { NoneAuth } from './api/auth/none.auth';
import { BearerAuth } from './api/auth/bearer.auth';
import { DB } from './infra/DB';
import { RegionController } from './api/controllers/region.controller';
import { RegionRepository } from './infra/repository/region.repository';
import { RegionService } from './domain/region/region.service';
import { ServerRepository } from './infra/repository/server.repository';
import { ServerService } from './domain/server/server.service';
import { ServerController } from './api/controllers/server.controller';
import { UserRepository } from './infra/repository/user.repository';
import { UserService } from './domain/user/user.service';
import { UserController } from './api/controllers/user.controller';
import { FeedbackController } from './api/controllers/feedback.controller';
import { FeedbackRepository } from './infra/repository/feedback.repository';
import { FeedbackService } from './domain/feedback/feedback.service';


export class Container {

	public static create(): AwilixContainer {
		const container = createContainer({
			injectionMode: InjectionMode.CLASSIC,
		});

		container.register({
			container: asValue(container),

			// App
			app: asClass(App).singleton(),
			config: asClass(Config).singleton(),
			logger: asClass(Logger).singleton(),
			usage: asClass(Usage).singleton(),

			// Infrastructure
			db: asClass(DB).singleton(),
			regionRepository: asClass(RegionRepository).singleton(),
			serverRepository: asClass(ServerRepository).singleton(),
			userRepository: asClass(UserRepository).singleton(),
			feedbackRepository: asClass(FeedbackRepository).singleton(),

			// Domain
			regionService: asClass(RegionService).singleton(),
			serverService: asClass(ServerService).singleton(),
			userService: asClass(UserService).singleton(),
			feedbackService: asClass(FeedbackService).singleton(),

			// Interfaces
			web: asClass(Web).singleton(),

			// Libs

		});

		container.register({
			authList: asValue({
				[DefaultAuthType.None]: container.build(NoneAuth),
				[AuthType.Bearer]: container.build(BearerAuth),
			}),
		});

		container.register({
			controllersList: asValue([
				container.build(ProbeController),
				container.build(PingController),
				container.build(RegionController),
				container.build(ServerController),
				container.build(UserController),
				container.build(FeedbackController),
			]),
		});

		container.register({
			initList: asValue([
				container.build(Usage),
				container.resolve('db'),
				container.resolve('web'),
			]),
		});

		return container;
	}

	private constructor() {
		//
	}
}
