import express from 'express';
import expressWs from 'express-ws';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const appBase = express();
const wsInstance = expressWs(appBase);
const { app } = wsInstance;

app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '128kb' }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.set('json spaces', 2);

app.use((_req, res, next) => {
  const origin = process.env.ORIGIN || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export { app };
