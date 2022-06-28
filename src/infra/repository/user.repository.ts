import { IUserRepository } from "../../domain/user/user.repository.i";
import { DB } from "../DB";
import { User, UserType } from "../../domain/user/user.entity";
import { User as UserModel } from "@prisma/client";

export class UserRepository implements IUserRepository {
  constructor(private db: DB) { }

  private toEntity(userModel: UserModel): User {
    return new User({
      ...userModel,
      type: userModel.type as UserType
    });
  }

  public async findByDeviceId(deviceId: string): Promise<User | null> {
    const user = await this.db.client.user.findUnique({
      where: {
        deviceId,
      },
    });

    return user ? this.toEntity(user) : null;
  }

  public async create(user: User): Promise<User> {
    const newUser = await this.db.client.user.create({
      data: user,
    });

    return this.toEntity(newUser);
  }
}