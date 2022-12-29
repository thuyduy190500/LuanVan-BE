"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class THANHPHO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      THANHPHO.hasMany(models.QUAN);
      THANHPHO.hasMany(models.TTNT);
    }
  }
  THANHPHO.init(
    {
      TenTP: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "THANHPHO",
    }
  );
  return THANHPHO;
};
