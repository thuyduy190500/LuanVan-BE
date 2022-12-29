"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("PHIEUTHUs", "TrangThai", Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "PHIEUTHUs",
      "TrangThai",
      Sequelize.STRING
    );
  },
};
