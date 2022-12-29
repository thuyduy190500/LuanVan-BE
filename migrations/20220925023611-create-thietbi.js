'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('THIETBIs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenTB: {
        type: Sequelize.STRING
      },
      MoTa: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('THIETBIs');
  }
};