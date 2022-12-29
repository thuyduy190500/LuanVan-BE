"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DUONG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DUONG.belongsTo(models.PHUONG);
      DUONG.hasMany(models.NHATRO);
      DUONG.hasMany(models.TTNT);
    }
  }
  DUONG.init(
    {
      TenDuong: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DUONG",
    }
  );
  return DUONG;
};
