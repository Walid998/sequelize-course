import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Role extends Model {
    public static associate(models: any) {
      Role.belongsTo(models.User);
    }
  }
  Role.init(
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'Role' }
  );
  return Role;
};
