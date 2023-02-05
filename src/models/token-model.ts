import { Schema, model } from 'mongoose';
import { TokenSchema } from './types';

const tokenSchema = new Schema<TokenSchema>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const tokenModel = model('Token', tokenSchema);

export { tokenModel };
