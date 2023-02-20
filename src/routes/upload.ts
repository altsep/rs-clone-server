import { Handler } from 'express';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import sharp from 'sharp';
import { app } from '../app';
import { basedir } from '../constants';
import { asyncMiddleware } from '../middlewares/async-middleware';
import { upload } from '../middlewares/upload-middleware';

const getImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
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

const uploadImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  if (req.file) {
    const bytesToKB = (n: number): string => `${(n / 1024).toFixed(2)}KB`;

    console.log(bytesToKB(req.file.size));
    const outputPath = `${req.file.path}.webp`;

    const image = sharp(req.file.path);

    image
      .resize(150, 150, {
        fit: 'cover',
      })
      .webp({ quality: 60 });

    await image.clone().toFile(outputPath);
    const buffer = await image.clone().toBuffer();

    await fsPromises.unlink(req.file.path);

    const { size } = await fsPromises.stat(outputPath);
    console.log(bytesToKB(size));

    res.sendFile(outputPath);
  }
});

type TRenderView = (p: string) => Handler;

const renderView: TRenderView = (p) => (req, res, next) => {
  res.sendFile(p, (err) => {
    if (err) next(err);
  });
};

const renderTemplate = renderView(path.resolve(basedir, 'views/upload.html'));
const renderImage = renderView(path.resolve(basedir, 'views/image.html'));

app.get('/view/upload', renderTemplate);

app.get('/view/image', renderImage);

app.get('/api/upload/:id', getImage);

app.post('/api/upload', upload.single('image'), uploadImage);
