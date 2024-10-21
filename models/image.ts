// src/models/image.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index'; // Sesuaikan import ini sesuai dengan pengaturan Anda

class Image extends Model {
  public id!: number;
  public url!: string;
  public description!: string;
  public stars!: number; // Total bintang (likes)

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init({
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
    defaultValue: 0, // Default jumlah bintang
  },
}, {
  sequelize,
  tableName: 'images',
});

export default Image;
