// Vendors
import { highlight } from 'cli-highlight';
import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';

import logger from '../logger';

const basename = _basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_HOST,
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_DIALECT,
  {
    benchmark: true,
    define: { underscored: true },
    logging: (log, elapsed) => {
      const query = highlight(log, { language: 'sql', ignoreIllegals: true });
      logger.debug(`sequelize-query: ${query} [${elapsed}ms]`);
    },
  }
);

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
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
