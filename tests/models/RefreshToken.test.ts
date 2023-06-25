import { testHelper } from '../test-helper';
import { Sequelize } from 'sequelize';
import { User, UserAttributes } from '../../src/models/User/User';
import { RefreshToken } from '../../src/models/RefreshToken/RefreshToken';

describe('RefreshToken', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    // Set up a mock Sequelize instance
    sequelize = (await testHelper.startDB()) as any;
  });

  afterAll(async () => {
    // Close the Sequelize connection after all tests have completed
    await testHelper.stopDB();
  });
  describe('Test onDelete:\'CASCADE\'', () => {
    it('should delete the refreshToken record if the user is deleted', async () => {
      // Create a mock user object
      const userAttributes: UserAttributes = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        roles: ['admin', 'customer'],
        refreshToken: { token: 'test-referesh-token' },
      };

      const user = await User.createNewUser(
        userAttributes as UserAttributes,
        sequelize
      );

      let refreshTokenCount = await RefreshToken.count();
      expect(refreshTokenCount).toBe(1);
      await user.destroy();
      refreshTokenCount = await RefreshToken.count();
      expect(refreshTokenCount).toBe(0);
    });
  });
});
