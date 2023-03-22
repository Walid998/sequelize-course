import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class RefreshToken extends Model {
    public static associate(models: any) {
      RefreshToken.belongsTo(models.User,{onDelete:'CASCADE', onUpdate:'CASCADE'});
    }
  }

  RefreshToken.init(
    {
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'RefreshToken' }
  );

  return RefreshToken;
};
