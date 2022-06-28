import { v4 as uuid } from 'uuid';

export enum UserType {
  PREMIUM = 'PREMIUM',
  FREE = 'FREE',
}

export class User {
  public id: string;
  public deviceId: string;
  public type: UserType;

  constructor(init: Partial<User>) {
    this.id = init.id || uuid();
    this.deviceId = init.deviceId!;
    this.type = init.type || UserType.FREE;
  }
}