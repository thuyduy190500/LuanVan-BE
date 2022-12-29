'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KHACHTHUEs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenKH: {
        type: Sequelize.STRING
      },
      NamSinh: {
        type: Sequelize.DATE
      },
      GioiTinh: {
        type: Sequelize.BOOLEAN
      },
      Sdt: {
        type: Sequelize.STRING
      },
      cmnd: {
        type: Sequelize.STRING
      },
      HoKhau: {
        type: Sequelize.STRING
      },
      NgheNghiep: {
        type: Sequelize.STRING
      },
      TrangThai: {
        type: Sequelize.STRING
      },
      NgayDen: {
        type: Sequelize.DATE
      },
      NgayDi: {
        type: Sequelize.STRING
      },
      DaiDienPhong: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('KHACHTHUEs');
  }
};