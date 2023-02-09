import { app } from '../app';
import { errorMiddleware } from './error-middleware';

app.use(errorMiddleware);
