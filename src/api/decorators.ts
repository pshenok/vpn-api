/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthType } from './auth/auth.types';
import { IHandlerData as IHandlerDataApp } from 'core/lib/interfaces/decorators';
import { DefaultAuthType } from 'core/lib/interfaces/auth.types';


export interface IHandlerData extends IHandlerDataApp {
	auth: AuthType | DefaultAuthType;
	options?: {
		sendFile: boolean;
		deleteAfterSend: boolean;
	};
}

export function handler(handlerData: IHandlerData) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		Reflect.defineMetadata('handler:data', handlerData, target, propertyKey);
	};
}
