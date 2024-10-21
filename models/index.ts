import { Sequelize } from 'sequelize';
import { User } from './user';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

export { sequelize, User };

// Sync models to create tables if they don't exist
sequelize.sync();
