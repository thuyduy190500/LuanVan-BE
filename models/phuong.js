"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PHUONG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PHUONG.belongsTo(models.QUAN);
      PHUONG.hasMany(models.DUONG);
      PHUONG.hasMany(models.TTNT);
    }
  }
  PHUONG.init(
    {
      TenPhuong: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PHUONG",
    }
  );
  return PHUONG;
};
