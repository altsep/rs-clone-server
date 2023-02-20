import { Schema } from 'mongoose';

const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

export { imageSchema };
