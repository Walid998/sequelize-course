import { Model, Optional, Sequelize } from 'sequelize';
import { USER_MODEL_ATTRIBUTES } from './User.schema';
import bycrpt from 'bcrypt';
import { Environment } from '../../config/environment';
import { Role } from '../Role/Role';
import { RefreshToken } from '../RefreshToken/RefreshToken';

export interface UserAttributes {
  id: number;
  email?: string;
  password?: string;
  roles?: any[];
  username?: string;
  firstName?: string;
  lastName?: string;
  refreshToken?: {token: string};
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  email: string | undefined;
  password: string | undefined;
  roles?: any[];
  username?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  refreshToken?: {token: string } | undefined;

  static async createNewUser(
    userAttributes: UserAttributes,
    sequelize: Sequelize
  ) {
    return sequelize.transaction(() => {
      let rolesToSave: any[] = [];
      if (userAttributes.roles && Array.isArray(userAttributes.roles)) {
        rolesToSave = userAttributes.roles.map((role) => ({ role }));
      }

      return User.create(
        {
          email: userAttributes.email,
          password: userAttributes.password,
          username: userAttributes.username,
          firstName: userAttributes.firstName,
          lastName: userAttributes.lastName,
          roles: rolesToSave,
          refreshToken: userAttributes.refreshToken,
        },
        { include: [Role, RefreshToken] }
      );
    });
  }
  comparePasswords = async (password: string) => {
    return await bycrpt.compare(password, this.password!);
  };
  static async hashPassword(password: string) {
    const hashedPassword = await bycrpt.hash(password, Number(Environment.saltRounds));
    return hashedPassword;
  }

  static initModel(sequelize: Sequelize) {
    User.init(USER_MODEL_ATTRIBUTES, {
      sequelize,
      modelName: 'users',
      defaultScope: { attributes: { exclude: ['password'] } },
      scopes: { withPassword: { attributes: { include: ['password'] } } },
    });
    User.beforeSave(async (user: User) => {
      const hashedPassword = await User.hashPassword(user.password!);
      user.password = hashedPassword;
    });

    User.afterCreate(async (user: User) => {
      delete user.dataValues.password;
    });
  }

  static associate(models: any) {
    User.hasOne(models.refreshTokens);
    User.hasMany(models.roles);
  }
}
