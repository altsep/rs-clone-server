import fsPromises from 'fs/promises';
import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { asyncMiddleware } from '../../middlewares/async-middleware';
import { setUserAvatar } from '../../services/user/setUserAvatar';
import { setUserCover } from '../../services/user/setUserCover';
import { setPostImage } from '../../services/post/setPostImage';
import { SharpInstance, ProcessOpts } from './SharpInstance';

interface IImageService {
  serviceFn: (id: number, buf: Buffer, contentType: string) => Promise<unknown>;
  processOpts: Partial<ProcessOpts>;
}

const services: Record<string, IImageService> = {
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
  'post-img': {
    serviceFn: setPostImage,
    processOpts: {
      width: 500,
      height: 500,
      quality: 40,
    },
  },
};

export const uploadImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  const { id } = req.params;
  const errors = validationResult(req);

  if (!req.file || !errors.isEmpty()) {
    throw Error('Bad Request');
  }

  const { serviceFn, processOpts } = services[req.file.fieldname];

  const sharpInstance = new SharpInstance(req.file.path, processOpts);

  const buffer = await sharpInstance.process();

  await fsPromises.unlink(req.file.path);

  const data = await serviceFn(Number(id), buffer, sharpInstance.contentType);

  res.send(data);
});
