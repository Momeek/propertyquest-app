'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logger', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      uuid: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      level: {
        type: Sequelize.STRING,
      },
      meta: {
        type: Sequelize.TEXT,
      },
      app: {
        type: Sequelize.STRING,
      },
      logger: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.TEXT,
      },
      fatal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Logger');
  },
};
