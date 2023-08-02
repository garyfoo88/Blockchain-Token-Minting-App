import { UserRepository } from "../../repositories/user/UserRepository";
import { AuthService } from "../auth/AuthService";
import { UserService } from "./UserService";

export const makeUserService = () => {
  const userRepository = new UserRepository();
  const authService = new AuthService();
  return new UserService(userRepository, authService);
};
