"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PHIEUDATPHONG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PHIEUDATPHONG.belongsTo(models.PHONG);
    }
  }
  PHIEUDATPHONG.init(
    {
      HoTen: DataTypes.STRING,
      NamSinh: DataTypes.STRING,
      GioiTinh: DataTypes.STRING,
      Sdt: DataTypes.STRING,
      NgheNghiep: DataTypes.STRING,
      SLNguoiO: DataTypes.INTEGER,
      NhuCauSD: DataTypes.STRING,
      TrangThai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PHIEUDATPHONG",
    }
  );
  return PHIEUDATPHONG;
};
