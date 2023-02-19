import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { basedir } from '../constants';

const imagesDir = path.resolve(basedir, 'tmp');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(file);
    cb(null, imagesDir);
  },
  filename(req, file, cb) {
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      const len = files.length;
      const filename = String(len + 1) + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  const hasCorrectMime = [file.mimetype === 'image/png', file.mimetype === 'image/jpeg'].some(Boolean);
  cb(null, hasCorrectMime);
};

const limits = {
  fileSize: 1024 * 256,
};

export const upload = multer({ storage, fileFilter, limits });
