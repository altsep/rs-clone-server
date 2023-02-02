import express from 'express';
import expressWs from 'express-ws';
import compression from 'compression';
import morgan from 'morgan';

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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export { app };
