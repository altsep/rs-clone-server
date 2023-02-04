import { Schema, model } from 'mongoose';
import { TokenModel } from '../types';

const TokenSchema = new Schema<TokenModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const tokenModel = model('Token', TokenSchema);

export { tokenModel, TokenSchema };
