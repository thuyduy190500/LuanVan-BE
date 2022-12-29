"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class THANG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      THANG.hasMany(models.GIAPHONG);
      THANG.hasMany(models.PHIEUTHU);
      THANG.hasMany(models.TTPHIEUTHU);
      THANG.hasMany(models.CHISO_DN);
    }
  }
  THANG.init(
    {
      Thang: DataTypes.STRING,
      DonGiaDien: DataTypes.STRING,
      DonGiaNuoc: DataTypes.STRING,
      TrangThai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "THANG",
    }
  );
  return THANG;
};
