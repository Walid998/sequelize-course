import { sign, SignOptions, verify } from 'jsonwebtoken';
import environment from '../config/environment';

export default class JWTUtils {
  static generateAccessToken(
    payload: string | object | Buffer,
    options?: SignOptions | undefined
  ) {
    return sign(payload, environment.jwtAccessTokenSecret, options);
  }

  static generateRefreshToken(
    payload: string | object | Buffer,
  ) {
    return sign(payload, environment.jwtRefreshTokenSecret);
  }

  static verifyAccessToken(
    accessToken: string,
  ) {
    return verify(accessToken, environment.jwtAccessTokenSecret);
  }

  static verifyRefreshToken(
    refreshToken: string,
  ) {
    return verify(refreshToken, environment.jwtRefreshTokenSecret);
  }

}
