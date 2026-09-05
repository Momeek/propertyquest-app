'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('User', 'professionalInfo', {
      type: Sequelize.JSON,
      after: 'active',
      allowNull: true,
    });
    await queryInterface.addColumn('User', 'location', {
      type: Sequelize.JSON,
      after: 'active',
      allowNull: true,
    });
    await queryInterface.addColumn('User', 'socialMedia', {
      type: Sequelize.JSON,
      after: 'active',
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('User', 'professionalInfo');
    await queryInterface.removeColumn('User', 'location');
    await queryInterface.removeColumn('User', 'socialMedia');
  },
};
