import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/user.entity';
import JwtSettings from '../../settings/jwt.settings';

/**
 * This class provides authentication-related utility functions for password hashing, verification, and token generation.
 */
export default class AuthService {
  /**
   * Compares a given password with a hashed password stored in a user object.
   *
   * @param user - The User object containing the hashed password
   * @param password - The plain-text password to compare
   * @returns A Promise that resolves to true if the passwords match, false otherwise
   */
  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  /**
   * Hashes a plain-text password using bcrypt.
   *
   * @param password - The plain-text password to hash
   * @returns A Promise that resolves to the hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Generates a JSON Web Token (JWT) for authentication.
   *
   * @param payload - An object containing the data to be included in the token
   * @returns The generated JWT string
   */
  static generateAuthToken(payload: {
    id: number;
    name: string;
    email: string;
  }) {
    return jwt.sign(payload, JwtSettings.secretKey, {
      expiresIn: JwtSettings.authTokenExpireTime,
    });
  }
}
