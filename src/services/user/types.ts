import { User } from '../../types';
import { Tokens } from '../token/generateTokens';

type TResponseData = { user: User } & Tokens;

export type { TResponseData as ResponseData };
