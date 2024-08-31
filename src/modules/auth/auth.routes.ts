import BaseRouter from '../../routes/base.router';
import AuthController from './auth.controller';

export default class AuthRoutes extends BaseRouter {
  protected override base = '/api';

  protected override configureRoutes(): void {
    this.router.post('/register', AuthController.register);
    this.router.post('/login', AuthController.login);
  }
}
