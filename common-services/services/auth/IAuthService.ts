export interface IAuthService {
  hashPassword(password: string): string;
  validatePassword(password: string, hashedPassword: string): boolean;
  createToken(userId: string): string;
}
