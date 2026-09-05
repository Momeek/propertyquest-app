'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Admin', {
      adminId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING({ length: 100 }),
        validate: {
          isEmail: {
            msg: 'Enter a valid email',
          },
        },
      },
      isSuperAdmin: {
        type: Sequelize.BOOLEAN,
      },
      password: {
        type: Sequelize.STRING,
      },
      permissions: {
        type: Sequelize.TEXT,
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Admin');
  },
};
