/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'UserDocument',
        {
          userDocumentId: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
          },
          userId: {
            type: Sequelize.UUID,
            references: {
              model: 'User',
              key: 'userId',
            },
          },
          cacNumber: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          nin: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          businessDocumentUrl: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          isAffiliated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          affiliationDocumentUrl: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          inReview: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
          deletedAt: Sequelize.DATE,
        },
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('UserPassword', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
