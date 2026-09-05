'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if columns exist first
    const tableDescription = await queryInterface.describeTable('User');

    if (!tableDescription.resetPasswordCode) {
      await queryInterface.addColumn('User', 'resetPasswordCode', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!tableDescription.resetPasswordCodeExpiry) {
      await queryInterface.addColumn('User', 'resetPasswordCodeExpiry', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Check if columns exist before removing them
    const tableDescription = await queryInterface.describeTable('User');

    if (tableDescription.resetPasswordCode) {
      await queryInterface.removeColumn('User', 'resetPasswordCode');
    }

    if (tableDescription.resetPasswordCodeExpiry) {
      await queryInterface.removeColumn('User', 'resetPasswordCodeExpiry');
    }
  },
};
