import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

export class User extends Model {
  public id!: number;
  public username!: string;
  public githubId!: string;
  public profileUrl!: string;
  public avatarUrl!: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profileUrl: {
      type: DataTypes.STRING,
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'Users',
  }
);
