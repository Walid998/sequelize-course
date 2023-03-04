import { SignOptions, JsonWebTokenError } from 'jsonwebtoken';
import JWTUtils from '../../src/utils/jwt-utils';

describe('jwt-utils test cases', () => {
  test('should return access token', () => {
    const payload = { email: 'walid@ex.com' };
    const options: SignOptions = { expiresIn: '1d' };
    expect(JWTUtils.generateAccessToken(payload, options)).toEqual(
      expect.any(String)
    );
  });

  test('should return refresh token', () => {
    const payload = { email: 'walid@ex.com' };
    expect(JWTUtils.generateRefreshToken(payload)).toEqual(expect.any(String));
  });

  test('verify access token is valid', () => {
    const payload = { email: 'walid@ex.com' };
    const options: SignOptions = { expiresIn: '1d' };
    const accessToken = JWTUtils.generateAccessToken(payload, options);
    expect(JWTUtils.verifyAccessToken(accessToken)).toEqual(
      expect.objectContaining(payload)
    );
  });

  test('verify refresh token is valid', () => {
    const payload = { email: 'walid@ex.com' };
    const refreshToken = JWTUtils.generateRefreshToken(payload);
    expect(JWTUtils.verifyRefreshToken(refreshToken)).toEqual(
      expect.objectContaining(payload)
    );
  });

  test('raise an error if access token is invalid', () => {
    expect(() => JWTUtils.verifyAccessToken('invalid token')).toThrow(
      JsonWebTokenError
    );
  });

  test('raise an error if refresh token is invalid', () => {
    expect(() => JWTUtils.verifyRefreshToken('invalid token')).toThrow(
      JsonWebTokenError
    );
  });
});
