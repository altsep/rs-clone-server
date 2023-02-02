import { Post, User } from './types';

const basedir = __dirname;
const MS_IN_A_WEEK = 604800000;
const MS_IN_A_DAY = 86400000;
const MS_IN_A_MINUTE = 60000;
const ALLOWED_USER_KEYS: (keyof User)[] = ['name', 'password', 'alias', 'birthDate', 'country', 'createdAt'];
const ALLOWED_POST_KEYS: (keyof Post)[] = ['userId', 'description', 'createdAt'];

export { basedir, MS_IN_A_WEEK, MS_IN_A_DAY, MS_IN_A_MINUTE, ALLOWED_USER_KEYS, ALLOWED_POST_KEYS };
