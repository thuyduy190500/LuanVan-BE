"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KHACHTHUE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KHACHTHUE.belongsTo(models.PHONG);
    }
  }
  KHACHTHUE.init(
    {
      TenKH: DataTypes.STRING,
      NamSinh: DataTypes.DATE,
      GioiTinh: DataTypes.BOOLEAN,
      Sdt: DataTypes.STRING,
      cmnd: DataTypes.STRING,
      HoKhau: DataTypes.STRING,
      NgheNghiep: DataTypes.STRING,
      TrangThai: DataTypes.STRING,
      NgayDen: DataTypes.DATE,
      NgayDi: DataTypes.STRING,
      DaiDienPhong: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "KHACHTHUE",
    }
  );
  return KHACHTHUE;
};
