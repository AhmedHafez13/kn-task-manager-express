import { Request, Response } from 'express';
import UserRepository from '../../repositories/user.repository';
import AuthService from './auth.service';
import AuthValidation from './auth.validation';

/**
 * This class handles authentication-related API endpoints for user registration and login.
 */
class AuthController {
  /**
   * Registers a new user with the provided credentials.
   *
   * @param req - Express request object containing user data in the body
   * @param res - Express response object
   */
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const { error } = AuthValidation.validateRegisterInput({
      name,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user exists
    if (await UserRepository.userExists(email)) {
      return res
        .status(422)
        .json({ message: 'This email is already registered' });
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const user = await UserRepository.createUser(name, email, hashedPassword);

    const token = AuthService.generateAuthToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Set the token as a cookie
    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
      sameSite: 'strict',
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { name: user.name, email: user.email },
    });
  }

  /**
   * Logs in a user with the provided email and password.
   *
   * @param req - Express request object containing login credentials in the body
   * @param res - Express response object
   */
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { error } = AuthValidation.validateLoginInput({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await UserRepository.findUserByEmail(email);
    if (!user || !(await AuthService.verifyPassword(user, password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = AuthService.generateAuthToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Set the token as a cookie
    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
      sameSite: 'strict',
    });

    res.status(201).json({
      message: 'Login successful',
      user: { name: user.name, email: user.email },
    });
  }
}

export default new AuthController();
