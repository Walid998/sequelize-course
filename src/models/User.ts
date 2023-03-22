import { DataTypes, Model, Sequelize } from 'sequelize';
import bycrpt from 'bcrypt';
import { Environment } from '../config/environment';

export default (sequelize: Sequelize) => {
  class User extends Model {
    email?: string;
    password?: string;
    static roles?: any;
    username?: string;
    firstName?: string;
    lastName?: string;
    static refreshToken?: Text;
    // constructor (){

    // }
    comparePasswords = async (password: string) => {
      return bycrpt.compare(this.password!, password);
    };
    public static associate(models: any) {
      User.hasOne(models.RefreshToken);
      User.hasMany(models.Role);
    }
    static async hashPassword(password: string) {
      return bycrpt.hash(password, Environment.saltRounds);
    }
    static async createNewUser(
      email: string,
      password: string,
      roles: any,
      username: string,
      firstName: string,
      lastName: string,
      refreshToken: Text
    ) {
      return sequelize.transaction(() => {
        let rolesToSave: any[] = [];
        if(roles && Array.isArray(roles)){
          rolesToSave = roles.map(role => ({role}));
        }
        return User.create({
          email,
          password,
          username,
          firstName,
          lastName,
          roles: rolesToSave,
          RefreshToken: {token: refreshToken},
        },
        {include: [User.refreshToken, User.roles]}
        );
      }
      );
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'This is not a valid email address',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 20],
            msg: 'the username length should be from 2 to 20 chars',
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: { attributes: { exclude: ['password'] } },
      scopes: { withPassword: { attributes: { include: ['password'] } } },
    }
  );
  User.beforeSave(async (user: User) => {
    const hashedPassword = await User.hashPassword(user.password!);
    user.password = hashedPassword;
  });

  User.afterCreate(async (user: User) => {
    delete user.dataValues.password;
  });

  return User;
};
