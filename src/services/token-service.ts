/* eslint-disable class-methods-use-this */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { DeleteResult } from 'mongodb';
import { Document, ObjectId } from 'mongoose';
import { tokenModel } from '../models/token-model';
import { TokenSchema } from '../models/types';
import { Tokens, User } from '../types';

class TokenService {
  public generateTokens = (payload: Partial<User> | string): Tokens => {
    const accessOpts = { expiresIn: '30m' };
    const accessSecret = process.env.JWT_ACCESS_SECRET || '';
    const accessToken: string = jwt.sign(payload, accessSecret, accessOpts);

    const refreshOpts = { expiresIn: '30d' };
    const refreshSecret = process.env.JWT_REFRESH_SECRET || '';
    const refreshToken: string = jwt.sign(payload, refreshSecret, refreshOpts);

    return { accessToken, refreshToken };
  };

  public saveToken = async (id: ObjectId, refreshToken: string): Promise<Document<unknown>> => {
    const tokenData = await tokenModel.findOne({ user: id });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = tokenModel.create({
      user: id,
      refreshToken,
    });

    return token;
  };

  public findRefreshToken = async (refreshToken: string): Promise<TokenSchema | null> => {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  };

  public validateAccessToken = (token: string): string | JwtPayload | undefined => {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
      return userData;
    } catch (e) {
      return undefined;
    }
  };

  public validateRefreshToken = (token: string): string | JwtPayload | undefined => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '');
      return userData;
    } catch (e) {
      return undefined;
    }
  };

  public removeToken = async (refreshToken: string): Promise<DeleteResult> => {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  };
}

export const tokenService = new TokenService();
