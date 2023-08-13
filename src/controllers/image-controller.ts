import { Handler } from 'express';
import { validationResult } from 'express-validator';
import fsPromises from 'fs/promises';
import { asyncMiddleware } from '../middlewares/async-middleware';
import { ImageSchema } from '../models/types';
import { imageService } from '../services/image-service';
import { postService } from '../services/post-service';
import { ProcessOpts, SharpInstance } from '../util/SharpInstance';

type GetImageService = (id: number) => Promise<ImageSchema | string[] | undefined>;

interface UploadImageService<T> {
  serviceFn: (id: number, img: T) => Promise<unknown>;
  processOpts: Partial<ProcessOpts>;
}

class ImageController {
  private imageServices: Record<string, GetImageService> = {
    'user-avatar': imageService.getUserAvatar,
    'user-cover': imageService.getUserCover,
    post: postService.getPostImages,
  };

  private multipleFileServices: Record<string, UploadImageService<ImageSchema[]>> = {
    'post-img': {
      serviceFn: postService.setPostImage,
      processOpts: {
        width: 500,
        height: 500,
        quality: 40,
      },
    },
  };

  private singleFileServices: Record<string, UploadImageService<ImageSchema>> = {
    'user-avatar': {
      serviceFn: imageService.setUserAvatar,
      processOpts: {
        width: 150,
        height: 150,
      },
    },
    'user-cover': {
      serviceFn: imageService.setUserCover,
      processOpts: {
        width: 1000,
        height: 300,
      },
    },
  };

  public getImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
    const { name, id } = req.query;
    const errors = validationResult(req);

    if (typeof name !== 'string' || !Object.hasOwn(this.imageServices, name) || !errors.isEmpty()) {
      throw Error('Bad Request');
    }

    const serviceFn = this.imageServices[name];

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

  public uploadImage: Handler = asyncMiddleware(async (req, res): Promise<void> => {
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

      const { serviceFn, processOpts } = this.multipleFileServices[req.files[0].fieldname];

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

      await serviceFn(Number(id), imgs);

      res.end();

      return;
    }

    if (req.file) {
      const { serviceFn, processOpts } = this.singleFileServices[req.file.fieldname];

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
}

export const imageController = new ImageController();
