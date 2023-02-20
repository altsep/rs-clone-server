import { Handler } from 'express';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import sharp from 'sharp';
import { app } from '../app';
import { basedir } from '../constants';
import { asyncMiddleware } from '../middlewares/async-middleware';
import { upload } from '../middlewares/upload-middleware';
import { imagesController } from '../controllers/images';

type TRenderView = (p: string) => Handler;

const renderView: TRenderView = (p) => (req, res, next) => {
  res.sendFile(p, (err) => {
    if (err) next(err);
  });
};

const renderTemplate = renderView(path.resolve(basedir, 'views/upload.html'));

const renderImage = renderView(path.resolve(basedir, 'views/image.html'));

app.get('/views/upload', renderTemplate);

app.get('/views/image', renderImage);

app.get('/api/images/:id', imagesController.getImage);

app.post('/api/upload', upload.single('image'), imagesController.uploadImage);
