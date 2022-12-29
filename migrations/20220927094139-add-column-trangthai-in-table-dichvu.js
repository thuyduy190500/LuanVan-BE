"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("DICHVUs", "TrangThai", Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "DICHVUs",
      "TrangThai",
      Sequelize.STRING
    );
  },
};
