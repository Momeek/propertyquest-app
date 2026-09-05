'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First check if column exists
    const tableDescription = await queryInterface.describeTable('User');

    if (!tableDescription.surname) {
      await queryInterface.addColumn('User', 'surname', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'name',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('User');

    if (tableDescription.surname) {
      await queryInterface.removeColumn('User', 'surname');
    }
  },
};
