import { Model, Optional, Sequelize } from 'sequelize';
import { ROLE_MODEL_ATTRIBUTES } from './Role.schema';

export interface RoleAttributes {
  id: number;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
}

type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;

export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  id!: number;
  role?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  userId?: number | undefined;
  
  static initModel(sequelize: Sequelize) {
    Role.init(ROLE_MODEL_ATTRIBUTES, { sequelize, modelName: 'roles' });
  }

  static associate(models: any) {
    // associate Role to users model will create 
    // a foreign key userId in roles model
    Role.belongsTo(models.users, {onDelete:'CASCADE', onUpdate:'CASCADE'});
  }
}
