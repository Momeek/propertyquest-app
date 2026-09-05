'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('User', 'dateOfbirth', {
      type: Sequelize.DATE,
      after: 'phone',
      allowNull: true,
    });
    await queryInterface.addColumn('User', 'gender', {
      type: Sequelize.STRING,
      after: 'phone',
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('User', 'dateOfbirth');
    await queryInterface.removeColumn('User', 'gender');
  },
};
