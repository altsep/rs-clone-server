import fsPromises from 'fs/promises';
import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { asyncMiddleware } from '../../middlewares/async-middleware';
import { setUserAvatar } from '../../services/user/setUserAvatar';
import { setUserCover } from '../../services/user/setUserCover';
import { setPostImage } from '../../services/post/setPostImage';
import { SharpInstance, ProcessOpts } from './SharpInstance';
import { ImageSchema } from '../../models/types';

interface IImageService<T> {
  serviceFn: (id: number, img: T) => Promise<unknown>;
  processOpts: Partial<ProcessOpts>;
}

const multipleFileServices: Record<string, IImageService<ImageSchema[]>> = {
  'post-img': {
    serviceFn: setPostImage,
    processOpts: {
      width: 500,
      height: 500,
      quality: 40,
    },
  },
};

const singleFileServices: Record<string, IImageService<ImageSchema>> = {
  'user-avatar': {
    serviceFn: setUserAvatar,
    processOpts: {
      width: 150,
      height: 150,
    },
  },
  'user-cover': {
    serviceFn: setUserCover,
    processOpts: {
      width: 1000,
      height: 300,
    },
  },
};

export const uploadImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  const { id } = req.params;
  const errors = validationResult(req);

  if ((!req.file && !req.files) || !errors.isEmpty()) {
    throw Error('Bad Request');
  }

  if (Array.isArray(req.files)) {
    if (!req.files.length) {
      res.send([]);
      return;
    }

    const { serviceFn, processOpts } = multipleFileServices[req.files[0].fieldname];

    const imgs = await Promise.all(
      req.files.map(async (file) => {
        const sharpInstance = new SharpInstance(file.path, processOpts);

        const { contentType } = sharpInstance;

        const buffer = await sharpInstance.process();

        await fsPromises.unlink(file.path);

        const img = { data: buffer, contentType };

        return img;
      })
    );

    const data = await serviceFn(Number(id), imgs);

    res.send(data);

    return;
  }

  if (req.file) {
    const { serviceFn, processOpts } = singleFileServices[req.file.fieldname];

    const sharpInstance = new SharpInstance(req.file.path, processOpts);

    const { contentType } = sharpInstance;

    const buffer = await sharpInstance.process();

    await fsPromises.unlink(req.file.path);

    const img = { data: buffer, contentType };

    const data = await serviceFn(Number(id), img);

    res.send(data);

    return;
  }

  res.end();
});
