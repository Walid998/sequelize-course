import { testHelper } from '../test-helper';
import { Sequelize } from 'sequelize';
import { User, UserAttributes } from '../../src/models/User/User';
import { Role } from '../../src/models/Role/Role';

describe('Role', () => {
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
    it('should delete the roles records if the user is deleted', async () => {
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

      let rolesCount = await Role.count();
      expect(user.roles?.length).toBe(rolesCount);
      await user.destroy();
      rolesCount = await Role.count();
      expect(rolesCount).toBe(0);
    });
  });
});
