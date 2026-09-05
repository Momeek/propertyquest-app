/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'UserPassword',
        {
          userPasswordId: {
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
          password: Sequelize.STRING,
          secret: Sequelize.STRING,
          resetToken: Sequelize.STRING,
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
