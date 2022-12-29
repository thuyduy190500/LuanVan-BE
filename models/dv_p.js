"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DV_P extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DV_P.belongsTo(models.PHONG);
      DV_P.belongsTo(models.DICHVU);
    }
  }
  DV_P.init(
    {
      DICHVUId: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "DV_P",
    }
  );
  return DV_P;
};
