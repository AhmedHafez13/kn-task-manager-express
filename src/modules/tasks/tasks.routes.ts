import AuthMiddleware from '../../middleware/auth.middleware';
import BaseRouter from '../../routes/base.router';
import TaskController from './tasks.controller';

class TaskRoutes extends BaseRouter {
  protected override base = '/api/tasks';

  protected override configurePreMiddleware(): void {
    this.router.use(AuthMiddleware.isAuthenticated);
  }

  protected override configureRoutes(): void {
    this.router.get('/', TaskController.getTasks);
    this.router.get('/:id', TaskController.getTaskById);
    this.router.post('/', TaskController.createTask);
    this.router.put('/:id', TaskController.updateTask);
    this.router.put('/:id/mark-completed', TaskController.markTaskCompleted);
    this.router.delete('/:id', TaskController.deleteTask);
  }
}

export default TaskRoutes;
