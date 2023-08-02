import { IUser } from "../../models/User";

export interface IUserService {
  loginUser(username: string, password: string): Promise<string>;
  registerUser(
    username: string,
    password: string,
    ethAddress: string
  ): Promise<IUser>;
  getUserById(userId: number): Promise<IUser>;
}
