import { AppDataSource } from '../../typeorm/data-source';
import { User } from '../entity/user.entity';

class UserRepository {
  repository;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  /**
   * Check if an email exists in the database.
   * @param email - The email to check.
   * @returns A boolean indicating whether the email exists.
   */
  async userExists(email: string): Promise<boolean> {
    return await this.repository.exists({ where: { email } });
  }

  /**
   * Create a new user.
   * @param name - The user's name.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns The created user entity.
   */
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = this.repository.create({ name, email, password });
    return this.repository.save(user);
  }

  /**
   * Find a user by their email.
   * @param email - The email of the user to find.
   * @returns The user entity or null if not found.
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }
}

export default new UserRepository();
