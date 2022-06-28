import { User } from "./user.entity";
import { IUserRepository } from "./user.repository.i";

export class UserService {
  constructor(private userRepository: IUserRepository) { }

  public async create(deviceId: string): Promise<User> {
    const user = await this.userRepository.findByDeviceId(deviceId);

    return user || this.userRepository.create(new User({ deviceId }));
  }
}