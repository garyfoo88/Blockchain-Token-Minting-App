import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  validatePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  createToken(userId: string): string {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  }
}
