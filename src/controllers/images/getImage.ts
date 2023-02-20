import { Handler } from 'express';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { basedir } from '../../constants';
import { asyncMiddleware } from '../../middlewares/async-middleware';

export const getImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  const { id } = req.params;
  const imagesDir = path.resolve(basedir, '..', 'tmp');
  const files = await fsPromises.readdir(imagesDir);

  files
    .map((name) => ({
      name,
      time: fs.statSync(`${imagesDir}/${name}`).mtime.getTime(),
    }))
    .sort((a, b) => a.time - b.time)
    .map(({ name }) => name);

  const filename = files[+id];

  if (!filename) {
    throw Error('Not Found');
  }

  const filePath = path.resolve(imagesDir, filename);

  const file = await fsPromises.readFile(filePath);

  const data = file.toString('base64');

  console.log(data.slice(0, 100));

  res.type('image/webp');
  res.send(data);
});
