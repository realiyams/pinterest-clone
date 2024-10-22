// src/models/star.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index'; // Adjust the import as needed
import User from './user'; // Import User model
import Image from './image'; // Import Image model

class Star extends Model {
  public id!: number;
  public userId!: number; // Foreign key to link to User
  public imageId!: number; // Foreign key to link to Image

  public readonly createdAt!: Date;

  // Define associations
  public static associate() {
    Star.belongsTo(User, { foreignKey: 'userId' });
    Star.belongsTo(Image, { foreignKey: 'imageId' });
    // Add a unique constraint on userId and imageId
    Star.removeAttribute('id'); // Remove default id field for the composite key
  }
}

Star.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Reference to User model
        key: 'id',
      },
      unique: 'userImageUnique', // Ensure unique user-image pairs
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Image, // Reference to Image model
        key: 'id',
      },
      unique: 'userImageUnique', // Ensure unique user-image pairs
    },
  },
  {
    sequelize,
    tableName: 'stars',
  }
);

export default Star;
