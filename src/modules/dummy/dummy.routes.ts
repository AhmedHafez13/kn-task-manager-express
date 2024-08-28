import BaseRouter from '../../routes/base.router';
import TestMiddleware from '../../middleware/test.middleware';
import TestModuleController from './dummy.controller';

class TestModuleRoutes extends BaseRouter {
  protected override base = '/api/test';

  protected override configurePreMiddleware(): void {
    this.router.use(TestMiddleware.isAuthenticated);
  }

  protected override configureRoutes(): void {
    const testModuleController = new TestModuleController();

    this.router.get(
      '/for-authorized',
      TestMiddleware.isAuthorized,
      testModuleController.testHandler
    );
    this.router.get('/for-authenticated', testModuleController.testHandler);
  }
}

export default TestModuleRoutes;
