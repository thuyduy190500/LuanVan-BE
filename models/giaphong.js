"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GIAPHONG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GIAPHONG.belongsTo(models.LOAIPHONG);
      GIAPHONG.belongsTo(models.THANG);
    }
  }
  GIAPHONG.init(
    {
      GiaPhong: DataTypes.FLOAT,
      TrangThai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GIAPHONG",
    }
  );
  return GIAPHONG;
};
