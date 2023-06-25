import { DataTypes, ModelAttributes } from 'sequelize';
import { User, UserAttributes } from './User';

export const USER_MODEL_ATTRIBUTES: ModelAttributes<User, UserAttributes> = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'This is not a valid email address',
      },
      notNull:{
        msg: 'Email is required'
      }
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
};
