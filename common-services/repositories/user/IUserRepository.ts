import { IUser } from "../../models/User";

export interface IUserRepository {
    findById(id: number): Promise<IUser>
}
