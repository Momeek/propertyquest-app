'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First check if column exists
    const tableDescription = await queryInterface.describeTable('User');

    if (!tableDescription.phone) {
      await queryInterface.addColumn('User', 'phone', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'email',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('User');

    if (tableDescription.phone) {
      await queryInterface.removeColumn('User', 'phone');
    }
  },
};
