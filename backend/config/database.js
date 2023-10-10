import { Sequelize } from 'sequelize';

const db = new Sequelize('REACTFLIX', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
