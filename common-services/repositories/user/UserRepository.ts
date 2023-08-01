import User, { IUser } from "../../models/User";

export class UserRepository {
  private readonly user = User;

  async findById(id: number): Promise<IUser> {
    const user = await this.user.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }
}
