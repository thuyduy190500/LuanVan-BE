"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class THIETBI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      THIETBI.hasMany(models.LP_TB);
    }
  }
  THIETBI.init(
    {
      TenTB: DataTypes.STRING,
      MoTa: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "THIETBI",
    }
  );
  return THIETBI;
};
