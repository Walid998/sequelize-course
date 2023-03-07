import { sign, SignOptions, verify } from 'jsonwebtoken';
import {Environment} from '../config/environment';

export default class JWTUtils {
  static generateAccessToken(
    payload: string | object | Buffer,
    options?: SignOptions | undefined
  ) {
    return sign(payload, Environment.jwtAccessTokenSecret, options);
  }

  static generateRefreshToken(
    payload: string | object | Buffer,
  ) {
    return sign(payload, Environment.jwtRefreshTokenSecret);
  }

  static verifyAccessToken(
    accessToken: string,
  ) {
    return verify(accessToken, Environment.jwtAccessTokenSecret);
  }

  static verifyRefreshToken(
    refreshToken: string,
  ) {
    return verify(refreshToken, Environment.jwtRefreshTokenSecret);
  }

}
