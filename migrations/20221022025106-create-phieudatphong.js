'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PHIEUDATPHONGs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HoTen: {
        type: Sequelize.STRING
      },
      NamSinh: {
        type: Sequelize.STRING
      },
      GioiTinh: {
        type: Sequelize.STRING
      },
      Sdt: {
        type: Sequelize.STRING
      },
      NgheNghiep: {
        type: Sequelize.STRING
      },
      SLNguoiO: {
        type: Sequelize.INTEGER
      },
      NhuCauSD: {
        type: Sequelize.STRING
      },
      TrangThai: {
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
    await queryInterface.dropTable('PHIEUDATPHONGs');
  }
};