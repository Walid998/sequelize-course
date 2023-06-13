import { testHelper } from '../test-helper';
import { Sequelize } from 'sequelize';
import { User, UserAttributes } from '../../src/models/User/User';
import bycrpt from 'bcrypt';

describe('User', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    // Set up a mock Sequelize instance
    sequelize = await testHelper.startDB() as any;
    
  });

  afterAll(async () => {
    // Close the Sequelize connection after all tests have completed
    await testHelper.stopDB();
  });
  describe('createNewUser', () => {
    it('should create a new user', async () => {
      // Create a mock user object
      const userAttributes: UserAttributes = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        roles: ['admin']
      };

      // Call the createNewUser method and verify that it returns a new user object
      const user = await User.createNewUser(
        userAttributes as UserAttributes,
        sequelize
      );
      expect(user.id).toBeDefined();
      expect(user.email).toBe(userAttributes.email);
      expect(user.username).toBe(userAttributes.username);
      expect(user.firstName).toBe(userAttributes.firstName);
      expect(user.lastName).toBe(userAttributes.lastName);
      const count = await User.count();
      expect(count).toBe(1);

      //Verify that the password has been hashed
      if (userAttributes.password && user.password) {
        const isPasswordMatch = bycrpt.compare(
          userAttributes.password,
          user.password
        );
        expect(isPasswordMatch).resolves.toBe(true);
      }
    });
  });

  describe('comparePasswords', () => {
    it('should compare the passwords correctly', async () => {
      // Create a mock user object with a hashed password
      const hashedPassword = await bycrpt.hash('password123', 10);
      const user = new User({
        email: 'test@example.com',
        password: hashedPassword,
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
      });

      // Call the comparePasswords method and verify that it returns true for the correct password
      const isPasswordMatch = await user.comparePasswords('password123');
      expect(isPasswordMatch).toBe(true);

      // Verify that it returns false for an incorrect password
      const isIncorrectPasswordMatch = await user.comparePasswords(
        'wrongpassword'
      );
      expect(isIncorrectPasswordMatch).toBe(false);
    });
  });
});
