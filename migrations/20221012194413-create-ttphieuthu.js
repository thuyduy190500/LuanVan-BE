'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TTPHIEUTHUs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NgayLap: {
        type: Sequelize.DATE
      },
      TongTien: {
        type: Sequelize.FLOAT
      },
      CSDienCu: {
        type: Sequelize.INTEGER
      },
      CSDienMoi: {
        type: Sequelize.INTEGER
      },
      CSNuocCu: {
        type: Sequelize.INTEGER
      },
      CSNuocMoi: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('TTPHIEUTHUs');
  }
};