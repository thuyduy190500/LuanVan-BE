'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TTNTs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DICHVUId: {
        type: Sequelize.JSON
      },
      LOAIPHONGId: {
        type: Sequelize.JSON
      },
      GiaDien: {
        type: Sequelize.STRING
      },
      GiaNuoc: {
        type: Sequelize.STRING
      },
      MoTa: {
        type: Sequelize.STRING
      },
      Sdt: {
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
    await queryInterface.dropTable('TTNTs');
  }
};