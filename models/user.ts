// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import Image from './image'; // Import Image model
import Star from './star';

export class User extends Model {
  public id!: number;
  public username!: string;
  public githubId!: string;
  public profileUrl!: string;
  public avatarUrl!: string;

  public static associate() {
    User.hasMany(Image, { foreignKey: 'userId' });
    User.hasOne(Star, { foreignKey: 'userId' }); // Association with Star
    // Image.belongsTo(User, { foreignKey: 'userId' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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

export default User;
