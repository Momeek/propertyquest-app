'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Property', {
      propertyId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      details: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      media: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      location: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      pricing: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Property');
  },
};
