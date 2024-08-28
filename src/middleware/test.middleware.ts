import { NextFunction, Response, Request } from 'express';

class TestMiddleware {
  public isAuthenticated = (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const flag = true;
    if (!flag) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };

  public isAuthorized = (_req: Request, res: Response, next: NextFunction) => {
    const flag = false;
    if (!flag) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };
}

export default new TestMiddleware();
