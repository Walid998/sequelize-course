import fs from 'fs';
import path from 'path';
import { Sequelize, Model } from 'sequelize';

interface IModels{
  [key: string]: Model;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Models: IModels = {};

export function registerModels(sequelize: Sequelize){
  const thisFile = path.basename(__filename);
  const modelFiles = fs.readdirSync(__dirname);
  const filteredModelFiles = modelFiles.filter(file => {
    return file !== thisFile && file.slice(-3) === '.ts';
  });

  for(const file of filteredModelFiles){
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model: Model = require(path.join(__dirname, file)).default(sequelize);
    Models[(model as any).name] = model;
  }

  Object.keys(Models).forEach(model => {
    if((Models[model] as any).associate){
      (Models[model] as any).associate(Models);
    }
  });

}

export default Models;
