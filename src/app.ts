import express from 'express';
import expressWs from 'express-ws';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose.set('strictQuery', false);

const DB_URI = process.env.DB_URI || '';

mongoose.connect(DB_URI).catch((e) => console.error(e));

const appBase = express();
const wsInstance = expressWs(appBase);
const { app } = wsInstance;

app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '128kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const origin = process.env.ORIGIN || '*';
const corsOpts = { credentials: true, origin };
app.use(cors(corsOpts));

app.set('json spaces', 2);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export { app };
