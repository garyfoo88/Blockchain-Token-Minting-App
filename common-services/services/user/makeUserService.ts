import { UserRepository } from "../../repositories/user/UserRepository";
import { UserService } from "./UserService";

export const makeUserService = () => {
  const userRepository = new UserRepository();
  return new UserService(userRepository);
};
