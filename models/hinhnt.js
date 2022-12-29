"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HINHNT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HINHNT.belongsTo(models.NHATRO);
    }
  }
  HINHNT.init(
    {
      TenHinh: DataTypes.STRING,
      Hinh: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "HINHNT",
    }
  );
  return HINHNT;
};
