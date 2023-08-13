import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
import { Util } from '../util/Util';

const setCreatedAt = function (
  this: Document & { createdAt: string },
  next: CallbackWithoutResultAndOptionalError
): void {
  if (!this.createdAt) {
    this.createdAt = Util.getIsoString();
  }

  next();
};

export { setCreatedAt };
