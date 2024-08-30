import { Request, Response } from 'express';
import passport from 'passport';

export default class AuthMiddleware {
  /**
   * Middleware function that authenticates a user using a JWT strategy.
   *
   * Expects a valid JWT token in the Authorization header with a Bearer token scheme.
   * If authentication is successful, attaches the user data extracted from the token
   * to the request object as `req.user`.
   *
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Next function in the middleware chain
   */
  static authenticate(req: Request, res: Response, next: Function) {
    passport.authenticate(
      'jwt',
      { session: false },
      (error: Error, user: { id: number; name: string; email: string }) => {
        if (error) {
          return next(error);
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  }

  /**
   * Middleware function that checks if a user is authenticated based on the presence
   * of `req.user`.
   *
   * If the user is not authenticated, sends a 401 Unauthorized response.
   *
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Next function in the middleware chain
   */
  static isAuthenticated(req: Request, res: Response, next: Function) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}
