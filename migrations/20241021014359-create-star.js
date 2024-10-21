// src/migrations/[timestamp]-create-star.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stars', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nama tabel untuk pengguna
          key: 'id',
        },
      },
      imageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'images', // Nama tabel untuk gambar
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stars');
  }
};
