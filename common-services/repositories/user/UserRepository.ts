import User, { IUser } from "../../models/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private readonly user = User;

  async findById(id: number): Promise<IUser | null> {
    return this.user.findById(id);
  }

  async getOneByAttributes(attributes: any): Promise<IUser | null> {
    return this.user.findOne(attributes);
  }

  async createUser(data: any): Promise<IUser> {
    const user = new this.user(data);

    return user.save();
  }
}
