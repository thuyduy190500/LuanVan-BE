"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("DICHVUs", "THANGId", {
      type: Sequelize.INTEGER,
      references: {
        model: "THANGs", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
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
