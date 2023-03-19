import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class RefreshToken extends Model {
    public static associate(models: any) {
      RefreshToken.belongsTo(models.User);
    }
  }

  RefreshToken.init(
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'RefreshToken' }
  );

  return RefreshToken;
};
