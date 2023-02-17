import fs from 'fs';
import { app } from '../app';

app.get('*', (_, res, next) => {
  fs.readFile('dist/index.html', 'utf-8', (err, data) => {
    if (err) {
      next(err);
      res.status(500).end('Internal server error');
    }

    res.end(data);
  });
});
