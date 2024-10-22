// src/models/image.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import User from './user'; // Import User model
import Star from './star';

export class Image extends Model {
  public id!: number;
  public url!: string;
  public description!: string;
  public stars!: number;
  public userId!: number; // Foreign key reference to User

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define association as a static method
  public static associate() {
    // User.hasMany(Image, { foreignKey: 'userId' });
    Image.belongsTo(User, { foreignKey: 'userId' });
    Image.hasMany(Star, { foreignKey: 'imageId' }); // Association with Star
  }
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Reference to User model
        key: 'id',
      },
      onDelete: 'CASCADE', // If the user is deleted, also delete their images
    },
  },
  {
    sequelize,
    tableName: 'images',
  }
);

// // Define the association here, no need for associate method
// Image.belongsTo(User, { foreignKey: 'userId' });

export default Image;
