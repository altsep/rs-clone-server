import express from 'express';
import expressWs from 'express-ws';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || '';
const MODE = process.env.MODE || '';
const ORIGIN = process.env.ORIGIN || '';
const corsOpts = { credentials: true, origin: ORIGIN };
const morganFormat = MODE === 'dev' ? 'dev' : 'short';

const appBase = express();
const wsInstance = expressWs(appBase);
const { app } = wsInstance;

app.use(compression());
app.use(morgan(morganFormat));
app.use(express.json({ limit: '128kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOpts));
app.set('json spaces', 2);
app.use(express.static('dist'));

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`)))
  .catch((e) => console.error(e));

export { app };
