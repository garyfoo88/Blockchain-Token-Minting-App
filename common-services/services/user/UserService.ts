import { IUser } from "../../models/User";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { HttpExceptionError } from "../../utils/errors";
import { IAuthService } from "../auth/IAuthService";
import { IUserService } from "./IUserservice";

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService
  ) {}
  /**
   * Function to login existing user
   * @param username
   * @param password
   */
  async loginUser(username: string, password: string): Promise<string> {
    const user = await this.userRepository.getOneByAttributes({ username });
    if (!user) {
      throw new HttpExceptionError(401, "Invalid Credentials");
    }

    const passwordIsValid = this.authService.validatePassword(
      password,
      user.password
    );
    if (!passwordIsValid) {
      throw new HttpExceptionError(401, "Invalid Credentials");
    }

    return this.authService.createToken(user._id);
  }

  /**
   * Function to register new user
   * @param username
   * @param password
   * @param ethAddress
   */
  async registerUser(
    username: string,
    password: string,
    ethAddress: string
  ): Promise<IUser> {
    const existingUser = await this.userRepository.getOneByAttributes({
      username,
    });
    if (existingUser) {
      throw new HttpExceptionError(403, "User already exists");
    }
    const hashedPassword = this.authService.hashPassword(password);

    return this.userRepository.createUser({
      username,
      password: hashedPassword,
      ethAddress,
    });
  }

  /**
   * Function to get user by id
   * @param userId
   */
  async getUserById(userId: number): Promise<IUser> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}
