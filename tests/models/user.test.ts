import { testHelper } from '../test-helper';
import { Sequelize } from 'sequelize';
import { User, UserAttributes } from '../../src/models/User/User';
import bycrpt from 'bcrypt';

describe('User', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    // Set up a mock Sequelize instance
    sequelize = (await testHelper.startDB()) as any;
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
        roles: ['admin', 'user'],
        refreshToken: { token: 'test-referesh-token' },
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

      // check saved roles
      expect(user.roles?.length).toBe(2);
      const userRoles = user.roles?.map((role) => role.role);
      expect(userRoles).toStrictEqual(['admin', 'user']);

      // check saved refreshToken
      expect(user.refreshToken?.token).toStrictEqual(
        userAttributes.refreshToken?.token
      );
    });
  });

  describe('test createNewUser validations', () => {
    it('should return an error if the email is invalid', async () => {
      const userAttributes: UserAttributes = {
        username: 'testuser',
        email: 'example.com',
        password: 'password123',
      };

      let error: any;
      try {
        await User.createNewUser(userAttributes as UserAttributes, sequelize);
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].path).toBe('email');
      expect(error.errors[0].message).toBe('This is not a valid email address');
    });
    it('should return an error if the email is mull', async () => {
      const userAttributes: UserAttributes = {
        username: 'testuser',
        password: 'password123',
      };

      let error: any;
      try {
        await User.createNewUser(userAttributes as UserAttributes, sequelize);
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].path).toBe('email');
      expect(error.errors[0].message).toBe('Email is required');
    });
    it('should return an error if the username less than 2', async () => {
      const userAttributes: UserAttributes = {
        username: 't',
        email: 'test1@example.com',
        password: 'password123',
      };

      let error: any;
      try {
        await User.createNewUser(userAttributes as UserAttributes, sequelize);
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].path).toBe('username');
      expect(error.errors[0].message).toBe(
        'the username length should be from 2 to 20 chars'
      );
    });
    it('should return an error if the username greater than 20', async () => {
      const userAttributes: UserAttributes = {
        username: 't'.repeat(21),
        email: 'test2@example.com',
        password: 'password123',
      };

      let error: any;
      try {
        await User.createNewUser(userAttributes as UserAttributes, sequelize);
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].path).toBe('username');
      expect(error.errors[0].message).toBe(
        'the username length should be from 2 to 20 chars'
      );
    });
    it('should return an error if the username duplicated', async () => {
      const userAttributes1: UserAttributes = {
        email: 'test4@example.com',
        password: 'password123',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        roles: ['admin', 'user'],
        refreshToken: { token: 'test-referesh-token' },
      };
      let error: any;
      try {
        await User.createNewUser(userAttributes1 as UserAttributes, sequelize);
      } catch (err) {
        error = err;
      }

      try {
        await User.createNewUser(userAttributes1 as UserAttributes, sequelize);
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].path).toBe('username');
      expect(error.errors[0].message).toBe('username must be unique');
    });
  });

  describe('comparePasswords', () => {
    let user: User;

    beforeAll(async () => {
      const userAttributes: UserAttributes = {
        email: 'userPassword@example.com',
        password: 'password123',
        username: 'userPassword',
        firstName: 'Test',
        lastName: 'User',
        roles: ['admin', 'user'],
        refreshToken: { token: 'test-referesh-token' },
      };
      user = await User.createNewUser(
        userAttributes as UserAttributes,
        sequelize
      );
    });
    it('should return true if the password is correct', async () => {
      const returndUser = await User.scope('withPassword').findByPk(user.id);
      const isPasswordMatch = await returndUser!.comparePasswords('password123');
      expect(isPasswordMatch).toBe(true);
    });
    it('should return false if the password is incorrect', async () => {
      const returndUser = await User.scope('withPassword').findByPk(user.id);
      const isPasswordMatch = await returndUser!.comparePasswords('incorrectPassword');
      expect(isPasswordMatch).toBe(false);
    });
  });

  describe('Scopes', () => {
    let user: User;
    beforeAll(async () => {
      const userAttributes: UserAttributes = {
        email: 'scopeUser@example.com',
        password: 'password123',
        username: 'scopeUser',
        firstName: 'Test',
        lastName: 'User',
        roles: ['admin', 'user'],
        refreshToken: { token: 'test-referesh-token' },
      };
      user = await User.createNewUser(
        userAttributes as UserAttributes,
        sequelize
      );
    });
    describe('Default Scope', () => {
      it('it should return a user without password', async () => {
        const returndUser = await User.findByPk(user.id);
        expect(returndUser?.password).toBeUndefined();
      });
    });

    describe('Custom Scope', () => {
      it('it should return a user with password', async () => {
        const returndUser = await User.scope('withPassword').findByPk(user.id);
        expect(returndUser?.password).toEqual(expect.any(String));
      });
    });
  });
});
