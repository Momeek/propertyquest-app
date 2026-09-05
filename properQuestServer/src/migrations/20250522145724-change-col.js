'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('User', 'role', {
      type: Sequelize.ENUM(
        'admin',
        'user',
        'developer',
        'property_manager',
        'landlord',
        'agent/broker',
      ),
      allowNull: false,
      defaultValue: 'user',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('User', 'role', {
      type: Sequelize.ENUM(
        'admin',
        'user',
        'developer',
        'property_manager',
        'landlord',
        'agent/broker',
      ),
      allowNull: false,
      defaultValue: 'user',
    });
  },
};
