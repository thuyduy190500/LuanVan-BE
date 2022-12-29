"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.removeColumn("DV_Ps", "DICHVUId", Sequelize.INTEGER);
  },

  async down(queryInterface, Sequelize) {},
};
