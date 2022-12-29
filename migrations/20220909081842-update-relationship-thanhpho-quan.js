"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("QUANs", "THANHPHOId", {
      type: Sequelize.INTEGER,
      references: {
        model: "THANHPHOs", // name of Target model
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
