import { Model, Optional, Sequelize } from 'sequelize';
import { REFRESH_TOKEN_MODEL_ATTRIBUTES } from './RefreshToken.schema';

export interface RefreshTokenAttributes {
  id: number;
  token?: Text;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
}

type RefreshTokenCreationAttributes = Optional<RefreshTokenAttributes, 'id'>;

export class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  id!: number;
  token?: Text;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  userId?: number | undefined;
  
  static initModel(sequelize: Sequelize) {
    RefreshToken.init(REFRESH_TOKEN_MODEL_ATTRIBUTES, { sequelize, modelName: 'refresh_tokens' });
  }

  static associate(models: any) {
    RefreshToken.belongsTo(models.users, {onDelete:'CASCADE', onUpdate:'CASCADE'});
  }
}
