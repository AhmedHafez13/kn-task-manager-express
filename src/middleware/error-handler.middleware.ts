import { Request, Response, NextFunction } from 'express';
import HttpErrorBase from '../error-handler/http-error.base';
import { NotFoundError } from '../error-handler/error.handlers';

/**
 * Middleware class for handling errors in the application.
 */
export default class ErrorHandlerMiddleware {
  /**
   * Handles cases where a requested route is not found or the request method is not allowed.
   *
   * This middleware should be placed at the end of middleware chain to catch any unhandled routes.
   *
   * @param _req - Unused request object (for consistency)
   * @param _res - Unused response object (for consistency)
   * @param next - Next function in the middleware chain
   */
  static routeNotFound(_req: Request, _res: Response, next: NextFunction) {
    const route = _req.originalUrl;
    const error = new NotFoundError(
      `Route '${route}' not found or request method not allowed`
    );
    next(error);
  }

  /**
   * General error handler that catches any errors thrown within application.
   *
   * This middleware should be placed at the very end of middleware chain to ensure it captures all errors.
   *
   * TODO: Implement proper error logging logic here (e.g., logging to file or service).
   *
   * @param error - The caught error object
   * @param _req - Unused request object (for consistency)
   * @param res - Express response object
   * @param _next - Unused next function (for consistency)
   */
  static serverError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    // TODO: Implement proper error logging (i.e. use Sentry)
    console.error(`${error.name}: ${error.message}`);

    if (error instanceof HttpErrorBase) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
}
