"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PHONG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PHONG.belongsTo(models.NHATRO);
      PHONG.belongsTo(models.LOAIPHONG);
      PHONG.hasMany(models.KHACHTHUE);
      PHONG.hasMany(models.DV_P);
      PHONG.hasMany(models.PHIEUTHU);
      PHONG.hasMany(models.TTPHIEUTHU);
      PHONG.hasMany(models.CHISO_DN);
      PHONG.hasMany(models.PHIEUDATPHONG);
    }
  }
  PHONG.init(
    {
      TenPhong: DataTypes.STRING,
      DienTich: DataTypes.STRING,
      SLToiDa: DataTypes.STRING,
      TrangThai: DataTypes.STRING,
      MoTa: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PHONG",
    }
  );
  return PHONG;
};
