// migrations/XXXX-create-stars-table.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stars', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Reference to users table
          key: 'id',
        },
        unique: 'userImageUnique', // Unique constraint for user-image pair
      },
      imageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'images', // Reference to images table
          key: 'id',
        },
        unique: 'userImageUnique', // Unique constraint for user-image pair
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stars');
  },
};
