import { Handler } from 'express';
import { asyncMiddleware } from '../../middlewares/async-middleware';
import { ImageSchema } from '../../models/types';
import { getUserAvatar } from '../../services/user/getUserAvatar';

type IImageService = (id: number) => Promise<ImageSchema>;

const imageServices: Record<string, IImageService> = {
  'user-avatar': getUserAvatar,
  // 'user-cover': getUserCover,
  // 'post-img': getPostImages,
};

export const getImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  const { name, id } = req.query;

  if (typeof name !== 'string' || !Object.hasOwn(imageServices, name)) {
    throw Error('Bad Request');
  }

  const serviceFn = imageServices[name];

  const { data, contentType } = await serviceFn(Number(id));

  res.contentType(contentType);
  res.send(data);
});
