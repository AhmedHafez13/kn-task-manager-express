import AuthRoutes from '../modules/auth/auth.routes';
import DummyRoutes from '../modules/dummy/dummy.routes';
import TaskRoutes from '../modules/tasks/tasks.routes';

const AppRoutes = [
  AuthRoutes,
  TaskRoutes,
  DummyRoutes,
];

export default AppRoutes;
