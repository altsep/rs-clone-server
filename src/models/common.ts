import { Schema } from 'mongoose';

const imageSchema = new Schema({
  data: { type: Buffer },
  contentType: {
    type: String,
  },
});

export { imageSchema };
