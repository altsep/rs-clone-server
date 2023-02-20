import fsPromises from 'fs/promises';
import { Handler } from 'express';
import { asyncMiddleware } from '../../middlewares/async-middleware';
import { setUserAvatar } from '../../services/user/setUserAvatar';
import { setUserCover } from '../../services/user/setUserCover';
import { setPostImage } from '../../services/post/setPostImage';
import { SharpInstance, ProcessOpts } from './SharpInstance';

interface ImageService {
  serviceFn: (id: number, buf: Buffer, contentType: string) => Promise<void>;
  processOpts: Partial<ProcessOpts>;
}

type ImageServices = Record<string, ImageService>;

const services: ImageServices = {
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
    },
  },
};

export const uploadImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  const { id } = req.params;

  if (!req.file || id == null) {
    throw Error('Bad Request');
  }

  // console.log(req.file);

  const { serviceFn, processOpts } = services[req.file.fieldname];

  const sharpInstance = new SharpInstance(req.file.path, processOpts);

  const buffer = await sharpInstance.process();

  await fsPromises.unlink(req.file.path);

  await serviceFn(Number(id), buffer, sharpInstance.contentType);

  console.log(Buffer.byteLength(buffer));

  const data = buffer.toString('base64');

  // res.send(data);

  const img = `<img src="data:${sharpInstance.contentType};base64,${data}"/>`;

  res.send(img);
});
