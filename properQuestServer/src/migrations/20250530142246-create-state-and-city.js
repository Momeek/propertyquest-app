'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'State',
        {
          stateId: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
          },
          stateName: Sequelize.STRING(100),
          country: Sequelize.STRING(50),
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        },
        { transaction },
      );

      await queryInterface.createTable(
        'City',
        {
          cityId: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
          },
          stateId: {
            type: Sequelize.UUID,
            references: {
              model: 'State',
              key: 'stateId',
            },
          },
          cityName: Sequelize.STRING(100),
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        },
        { transaction },
      );

      await queryInterface.createTable(
        'Device',
        {
          deviceId: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
          },
          deviceName: Sequelize.STRING,
          deviceType: Sequelize.STRING,
          deviceInfo: Sequelize.STRING,
          deviceUniqueId: {
            type: Sequelize.STRING,
            unique: true,
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
          deletedAt: Sequelize.DATE,
        },
        { transaction },
      );

      await queryInterface.createTable(
        'Address',
        {
          addressId: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
          },
          stateId: {
            type: Sequelize.UUID,
            references: {
              model: 'State',
              key: 'stateId',
            },
          },
          cityId: {
            type: Sequelize.UUID,
            references: {
              model: 'City',
              key: 'cityId',
            },
          },
          street: Sequelize.STRING,
          houseNumber: Sequelize.STRING,
          postalCode: Sequelize.STRING,
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
          deletedAt: Sequelize.DATE,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('Address', { transaction });
      await queryInterface.dropTable('Device', { transaction });
      await queryInterface.dropTable('City', { transaction });
      await queryInterface.dropTable('State', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
