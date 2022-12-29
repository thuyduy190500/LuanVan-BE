"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HINHNTs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TenHinh: {
        type: Sequelize.STRING,
      },
      Hinh: {
        type: Sequelize.BLOB("LONG"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("HINHNTs");
  },
};
