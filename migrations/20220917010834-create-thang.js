'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('THANGs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Thang: {
        type: Sequelize.STRING
      },
      DonGiaDien: {
        type: Sequelize.STRING
      },
      DonGiaNuoc: {
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
    await queryInterface.dropTable('THANGs');
  }
};