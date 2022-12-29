'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PHONGs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenPhong: {
        type: Sequelize.STRING
      },
      DienTich: {
        type: Sequelize.STRING
      },
      SLToiDa: {
        type: Sequelize.STRING
      },
      TrangThai: {
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
    await queryInterface.dropTable('PHONGs');
  }
};