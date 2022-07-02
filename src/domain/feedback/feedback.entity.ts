import { v4 as uuid } from 'uuid';

export class Feedback {
  public id: string;
  public text: string;
  public email?: string | null;
  public createdAt: Date;

  constructor(init: Partial<Feedback>) {
    this.id = init.id || uuid();
    this.text = init.text!;
    this.email = init.email || null;
    this.createdAt = init.createdAt || new Date();
  }
}