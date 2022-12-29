"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("THANGs", "TrangThai", Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("THANGs", "TrangThai", Sequelize.STRING);
  },
};
