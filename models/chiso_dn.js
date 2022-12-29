"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CHISO_DN extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CHISO_DN.belongsTo(models.THANG);
      CHISO_DN.belongsTo(models.PHONG);
    }
  }
  CHISO_DN.init(
    {
      ChiSoDien: DataTypes.INTEGER,
      ChiSoNuoc: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CHISO_DN",
    }
  );
  return CHISO_DN;
};
