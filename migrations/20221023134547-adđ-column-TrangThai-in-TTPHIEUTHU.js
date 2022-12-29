"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "TTPHIEUTHUs",
      "TrangThai",
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "TTPHIEUTHUs",
      "TrangThai",
      Sequelize.STRING
    );
  },
};
