import { User } from "./user.entity";

export interface IUserRepository {
  findByDeviceId(deviceId: string): Promise<User | null>;
  create(user: User): Promise<User>;
}