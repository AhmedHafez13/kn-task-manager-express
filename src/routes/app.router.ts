import { Application, Router } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import ErrorHandlerMiddleware from '../middleware/error-handler.middleware';
import AppRoutes from '../routes/app.routes';

export default class AppRouter {
  private app: Application;
  private appRouter: Router;

  constructor(app: Application) {
    this.app = app;
    this.appRouter = Router();
  }

  public configureRoutes() {
    this.registerPreMiddleware();

    this.registerAppRouts();

    this.registerPostMiddleware();
  }

  private registerPreMiddleware(): void {
    this.app.use(AuthMiddleware.authenticate);
  }

  registerAppRouts() {
    for (const Router of AppRoutes) {
      const router = new Router(this.app);
      this.appRouter.use(router.getBase(), router.getRouter());
    }

    this.app.use(this.appRouter);
  }

  private registerPostMiddleware(): void {
    // Catch all route handler for 404 Not Found errors
    this.app.use(ErrorHandlerMiddleware.routeNotFound);
  }
}
