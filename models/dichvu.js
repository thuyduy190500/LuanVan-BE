"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DICHVU extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DICHVU.hasMany(models.DV_P);
    }
  }
  DICHVU.init(
    {
      TenDV: DataTypes.STRING,
      DonGia: DataTypes.STRING,
      NgayAD: DataTypes.STRING,
      TrangThai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DICHVU",
    }
  );
  return DICHVU;
};
