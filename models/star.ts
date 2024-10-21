// src/models/star.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index'; // Sesuaikan import ini sesuai dengan pengaturan Anda

class Star extends Model {
  public id!: number;
  public userId!: number; // Kunci asing untuk menghubungkan ke pengguna
  public imageId!: number; // Kunci asing untuk menghubungkan ke gambar

  public readonly createdAt!: Date;
}

Star.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Nama tabel untuk pengguna
      key: 'id',
    },
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'images', // Nama tabel untuk gambar
      key: 'id',
    },
  },
}, {
  sequelize,
  tableName: 'stars',
});

export default Star;
