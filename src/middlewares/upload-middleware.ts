import multer from 'multer';
import path from 'path';
import { basedir } from '../constants';

const dest = path.resolve(basedir, 'tmp');

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  const hasCorrectMime = ['image/png', 'image/jpeg', 'image/webp'].some((mimetype) => file.mimetype === mimetype);
  cb(null, hasCorrectMime);
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

export const upload = multer({ dest, fileFilter, limits });
