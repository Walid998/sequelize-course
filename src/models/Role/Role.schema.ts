import { DataTypes, ModelAttributes } from 'sequelize';
import { Role, RoleAttributes } from './Role';

export const ROLE_MODEL_ATTRIBUTES: ModelAttributes<Role, RoleAttributes> = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
};
