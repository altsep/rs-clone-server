import fsPromises from 'fs/promises';
import { app } from '../app';

const getApp = async (): Promise<string> => {
  const distPath = 'dist/index.html';
  const { R_OK } = fsPromises.constants;
  await fsPromises.access(distPath, R_OK);
  const data = await fsPromises.readFile(distPath, 'utf-8');
  return data;
};

app.get('*', (_req, res, next) => {
  getApp()
    .then((data) => {
      res.set({ 'Content-Type': 'text/html' });
      res.end(data);
    })
    .catch((e) => next(e));
});
