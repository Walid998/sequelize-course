import { Sequelize } from 'sequelize';
import { RefreshToken } from './RefreshToken/RefreshToken';
import { Role } from './Role/Role';
import { User } from './User/User';

export class ModelsRegistration {
  
  static register(sequelize: Sequelize){
    this.initModels(sequelize);
    this.setupRelations(sequelize);
  }

  // Add created models here for initialization
  private static initModels(sequelize: Sequelize) {
    User.initModel(sequelize);
    Role.initModel(sequelize);
    RefreshToken.initModel(sequelize);
  }

  // Set up relationships
  private static setupRelations(sequelize: Sequelize) {
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });
  }
}
