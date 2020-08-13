require('dotenv').config();

// Vendors
import { highlight } from 'cli-highlight';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import logger from '../logger';

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    benchmark: true,
    define: { underscored: true },
    logging: (log, elapsed) => {
      const query = highlight(log, { language: 'sql', ignoreIllegals: true });
      logger.debug(`sequelize-query: ${query} [${elapsed}ms]`);
    },
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
