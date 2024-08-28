import { Application, Router } from 'express';

export default abstract class BaseRouter {
  protected abstract base: string;
  protected router: Router;

  constructor(protected app: Application) {
    this.router = Router();
  }

  getRouter(): Router {
    this.register();
    return this.router;
  }

  getBase(): string {
    return this.base;
  }

  private register(): void {
    this.configurePreMiddleware();

    this.configureRoutes();

    this.configurePostMiddleware();
  }

  protected configurePreMiddleware(): void {}

  protected abstract configureRoutes(): void;

  protected configurePostMiddleware(): void {}
}
