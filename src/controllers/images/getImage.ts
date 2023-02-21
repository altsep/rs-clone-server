import { Handler } from 'express';
import { asyncMiddleware } from '../../middlewares/async-middleware';
import { ImageSchema } from '../../models/types';
import { getPostImages } from '../../services/post/getPostImages';
import { getUserAvatar } from '../../services/user/getUserAvatar';
import { getUserCover } from '../../services/user/getUserCover';

type IImageService = (id: number) => Promise<ImageSchema | string[]>;

const imageServices: Record<string, IImageService> = {
  'user-avatar': getUserAvatar,
  'user-cover': getUserCover,
  post: getPostImages,
};

export const getImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  const { name, id } = req.query;

  if (typeof name !== 'string' || !Object.hasOwn(imageServices, name)) {
    throw Error('Bad Request');
  }

  const serviceFn = imageServices[name];

  const serviceData = await serviceFn(Number(id));

  if (Array.isArray(serviceData)) {
    res.send(serviceData);
    return;
  }

  const { data, contentType } = serviceData;

  res.contentType(contentType);
  res.send(data);
});
