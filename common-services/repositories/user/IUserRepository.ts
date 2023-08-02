import { IUser } from "../../models/User";

export interface IUserRepository {
  findById(id: number): Promise<IUser | null>;
  getOneByAttributes(attributes: any): Promise<IUser | null>;
  createUser(data: any): Promise<IUser>;
}
