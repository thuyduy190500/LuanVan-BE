"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("GIAPHONGs", "TrangThai", Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "GIAPHONGs",
      "TrangThai",
      Sequelize.STRING
    );
  },
};
