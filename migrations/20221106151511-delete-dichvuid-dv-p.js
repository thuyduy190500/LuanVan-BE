"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.removeColumn("DV_Ps", "DICHVUId", Sequelize.JSON);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
