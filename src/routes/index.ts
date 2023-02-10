import './auth';
import './users';
import './posts';
import { app } from '../app';
import { errorMiddleware } from '../middlewares/error-middleware';

app.use(errorMiddleware);
