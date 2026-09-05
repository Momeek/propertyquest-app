'use strict';

const { type } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatarUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      role: {
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
      },
      type: {
        type: Sequelize.ENUM('google', 'facebook', 'apple', 'local'),
        allowNull: false,
        defaultValue: 'local',
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verificationCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verificationCodeExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  },
};
