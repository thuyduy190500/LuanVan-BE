"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LOAIPHONG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LOAIPHONG.hasMany(models.PHONG);
      LOAIPHONG.hasMany(models.LP_TB);
      LOAIPHONG.hasMany(models.GIAPHONG);
    }
  }
  LOAIPHONG.init(
    {
      LoaiPhong: DataTypes.STRING,
      MoTa: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LOAIPHONG",
    }
  );
  return LOAIPHONG;
};
