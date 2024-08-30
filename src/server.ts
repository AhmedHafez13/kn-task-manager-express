import express, { Express } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import AppRouter from './routes/app.router';
import ErrorHandlerMiddleware from './middleware/error-handler.middleware';
import { AppDataSource } from '../typeorm/data-source';

class Server {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8080;
  }

  public async start(): Promise<void> {
    if (!(await this.connectToDatabase())) {
      process.exit();
    }

    this.setupLogger();
    this.setupMiddleware();
    this.configureRoutes();
    this.setupErrorHandling();

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  private async connectToDatabase(): Promise<boolean> {
    try {
      await AppDataSource.initialize();
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  private setupLogger(): void {
    this.app.use(morgan('combined'));
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    new AppRouter(this.app).configureRoutes();
  }

  private setupErrorHandling(): void {
    this.app.use(ErrorHandlerMiddleware.serverError);

    // TODO: Handle Unhandled Rejection
    process.on('unhandledRejection', (err) => {
      // TODO: LOG ERROR
      console.error('Unhandled Promise Rejection:', err);
      process.exit(1);
    });
  }
}

export default Server;
