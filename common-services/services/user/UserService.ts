import { IUser } from "../../models/User";

export class UserService {
  constructor(private readonly userRepository: any) {}

  async getUserById(userId: number): Promise<IUser> {
    return this.userRepository.findById(userId);
  }
}
