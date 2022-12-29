"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QUAN extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QUAN.belongsTo(models.THANHPHO);
      QUAN.hasMany(models.PHUONG);
      QUAN.hasMany(models.TTNT);
    }
  }
  QUAN.init(
    {
      TenQuan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "QUAN",
    }
  );
  return QUAN;
};
