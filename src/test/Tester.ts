import { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import axios from 'axios';
import https from 'https';
import { AwilixContainer } from 'awilix';
import { Container } from '../Container';
import { IInterface } from 'core/lib/interfaces/interfaces.types';
import { Config } from '../Config';
import { App } from 'core/lib/app/App';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';


export class Tester {
	public url!: string;
	public app!: App;
	public web!: IInterface;
	public config!: Config;
	public container!: AwilixContainer;
	public httpsAgent!: https.Agent;
	public data!: any;

	public async start(env?: { bodyLimit?: number }): Promise<void> {
		jest.setTimeout(60000);

		dotenv.config();

		process.env.NODE_ENV = 'test';
		process.env.WEB_PORT = '0';
		process.env.DB_DB = `test_${process.env.DB_DB}`;
		process.env.BODY_LIMIT = String(Number(env && env.bodyLimit) || 256);

		this.data = {};

		this.container = Container.create();
		this.app = this.container.cradle.app;

		await this.app.init();
		await this.app.start();

		this.web = this.container.cradle.web;
		this.config = this.container.cradle.config;

		this.url = `http://localhost:${this.web.getPort()}`;
	}

	public async stop(): Promise<void> {
		await this.app.stop();
	}

	public async request(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', path: string, opts: any = {}): Promise<any> {
		let query = '';

		if (opts.query) {
			query = new URLSearchParams(opts.query).toString();
		}

		const url = path + (query ? `?${query}` : '');

		const options: AxiosRequestConfig = {
			method: method,
			baseURL: this.url,
			url: url,
			data: opts.body,
			auth: opts.auth,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json',
			},
			httpsAgent: this.httpsAgent,
			validateStatus: () => {
				return true;
			},
			transformRequest: (data, headers) => {
				let strData: string;

				if (data) {
					strData = JSON.stringify(data);
				}

				if (opts.sign && opts.sign.privateKey) {
					const bodyHash = crypto.createHash('sha256').update(strData! || '').digest('hex').toUpperCase();

					const token = jwt.sign({
						method: method.toUpperCase(),
						url: url,
						bodyHash: bodyHash,
					}, opts.sign.privateKey, { algorithm: 'RS512' });

					headers!['X-SIGNATURE'] = token;
				}

				return strData!;
			},
		};

		try {
			const resp = await axios(options);

			return {
				statusCode: resp.status,
				body: resp.data,
			};
		} catch (err) {
			// tslint:disable:no-console
			console.error(err);

			throw err;
		}
	}
}
