'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First check if column exists
    const tableDescription = await queryInterface.describeTable('UserDocument');

    if (!tableDescription.role) {
      await queryInterface.addColumn('UserDocument', 'role', {
      type: Sequelize.ENUM(
        'admin',
        'user',
        'developer',
        'property_manager',
        'landlord',
        'agent/broker',
        'agency'
      ),
      allowNull: false,
      defaultValue: 'user',
      after: 'inReview',
    });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('UserDocument');

    if (tableDescription.role) {
      await queryInterface.removeColumn('UserDocument', 'role');
    }
  },
};
