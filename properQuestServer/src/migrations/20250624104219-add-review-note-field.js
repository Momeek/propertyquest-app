'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserDocument', 'reviewNote', {
      type: Sequelize.TEXT,
      after: 'docType',
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserDocument', 'reviewNote');
  },
};
