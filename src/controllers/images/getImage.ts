import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { asyncMiddleware } from '../../middlewares/async-middleware';
import { ImageSchema } from '../../models/types';
import { getPostImages } from '../../services/post/getPostImages';
import { getUserAvatar } from '../../services/user/getUserAvatar';
import { getUserCover } from '../../services/user/getUserCover';

type IImageService = (id: number) => Promise<ImageSchema | string[] | undefined>;

const imageServices: Record<string, IImageService> = {
  'user-avatar': getUserAvatar,
  'user-cover': getUserCover,
  post: getPostImages,
};

export const getImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
  const { name, id } = req.query;
  const errors = validationResult(req);

  if (typeof name !== 'string' || !Object.hasOwn(imageServices, name) || !errors.isEmpty()) {
    throw Error('Bad Request');
  }

  const serviceFn = imageServices[name];

  const serviceData = await serviceFn(Number(id));

  if (Array.isArray(serviceData)) {
    res.send(serviceData);
    return;
  }

  let img = '';

  if (serviceData != null) {
    const { data, contentType } = serviceData;
    const base64Str = data.toString('base64');
    img = `data:${contentType};base64,${base64Str}`;
  }

  res.send(img);
});
