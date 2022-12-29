"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LP_TB extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LP_TB.belongsTo(models.LOAIPHONG);
      LP_TB.belongsTo(models.THIETBI);
    }
  }
  LP_TB.init(
    {},
    {
      sequelize,
      modelName: "LP_TB",
    }
  );
  return LP_TB;
};
