import { DataTypes, ModelAttributes } from 'sequelize';
import { RefreshToken, RefreshTokenAttributes } from './RefreshToken';

export const REFRESH_TOKEN_MODEL_ATTRIBUTES: ModelAttributes<RefreshToken, RefreshTokenAttributes> = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
  },
};
