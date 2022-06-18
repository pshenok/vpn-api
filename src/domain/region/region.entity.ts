import { v4 as uuid } from 'uuid';

export class Region {
  public id: string;
  public name: string;
  public icon: string;
  public iso: string;
  public servers: string;

  constructor(init: Partial<Region>) {
    this.id = init.id || uuid();
    this.name = init.name!;
    this.icon = init.icon!;
    this.iso = init.iso!;
    this.servers = init.servers!;
  }
}