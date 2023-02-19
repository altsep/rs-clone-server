import { Handler } from 'express';
import fsPromises from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { app } from '../app';
import { basedir } from '../constants';
import { asyncMiddleware } from '../middlewares/async-middleware';
import { upload } from '../middlewares/upload-middleware';

const getImage: Handler = asyncMiddleware(async (req, res, next): Promise<void> => {
  const { id } = req.params;
  const imagesDir = path.resolve(basedir, 'tmp');
  const files = await fsPromises.readdir(imagesDir);
  const filename = files[+id];
  const filePath = path.resolve(imagesDir, filename);
  res.sendFile(filePath, (err) => {
    if (err) next(err);
  });
});

const uploadImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  console.log(req.file);
  if (req.file) {
    const outputPath = `${req.file.path}.webp`;

    await sharp(req.file.path)
      .resize(150, 150, {
        fit: 'cover',
      })
      .webp({ quality: 60 })
      .toFile(outputPath);

    await fsPromises.unlink(req.file.path);

    res.sendFile(outputPath);
  }
});

const renderTemplate: Handler = (req, res, next) => {
  res.sendFile(path.resolve(basedir, 'views/upload.html'), (err) => {
    if (err) next(err);
  });
};

app.get('/upload', renderTemplate);

app.get('/api/upload/:id', getImage);

app.post('/api/upload', upload.single('image'), uploadImage);
