import { v4 as uuid } from 'uuid';

export class Server {
  public id: string;
  public city: string;
  public ip: string;
  public key: string;
  public username: string;
  public password: string;
  public regionId: string;

  constructor(init: Partial<Server>) {
    this.id = init.id || uuid();
    this.city = init.city!;
    this.ip = init.ip!;
    this.key = init.key!;
    this.username = init.username!;
    this.password = init.password!;
    this.regionId = init.regionId!;
  }
}