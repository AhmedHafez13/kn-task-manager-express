import { config } from 'dotenv';
import Server from './src/server';

config();

const server = new Server();
server.start().catch((error: Error) => {
  console.error('Failed to start the server:', error);
});
