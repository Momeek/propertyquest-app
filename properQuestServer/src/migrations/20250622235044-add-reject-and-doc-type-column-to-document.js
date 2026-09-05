'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserDocument', 'rejected', {
      type: Sequelize.BOOLEAN,
      after: 'inReview',
      defaultValue: false,
    });

    await queryInterface.addColumn('UserDocument', 'docType', {
      type: Sequelize.BOOLEAN,
      after: 'inReview',
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserDocument', 'rejected');
    await queryInterface.removeColumn('UserDocument', 'docType');
  },
};
