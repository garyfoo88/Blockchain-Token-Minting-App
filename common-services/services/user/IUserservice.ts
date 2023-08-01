import { IUser } from "../../models/User";

export interface IUserService {
  getUserById(userId: number): Promise<IUser>;
}
