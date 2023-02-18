import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
import { getIsoString } from '../utils';

const setCreatedAt = function (
  this: Document & { createdAt: string },
  next: CallbackWithoutResultAndOptionalError
): void {
  if (!this.createdAt) {
    this.createdAt = getIsoString();
  }

  next();
};

export { setCreatedAt };
