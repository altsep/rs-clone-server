import { Schema, model, connection } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { getIsoString } from '../utils';
import { UserSchema } from './types';

const userSchema = new Schema<UserSchema>({
  userId: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  birthDate: {
    type: String,
    default: '',
  },
  alias: {
    type: String,
    unique: true,
  },
  avatarURL: {
    type: String,
    default: '',
  },
  postsIds: [
    {
      type: Number,
    },
  ],
  friendsIds: [
    {
      type: Number,
    },
  ],
  activationLink: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('validate', function (next) {
  if (!this.createdAt) {
    this.createdAt = getIsoString();
  }

  next();
});

autoIncrement.initialize(connection);

userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId', startAt: 1 });

const userModel = model('User', userSchema);

export { userModel };
