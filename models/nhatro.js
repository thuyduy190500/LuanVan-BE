"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NHATRO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NHATRO.belongsTo(models.DUONG);
      NHATRO.hasMany(models.PHONG);
      NHATRO.hasMany(models.HINHNT);
      NHATRO.hasMany(models.TTNT);
      NHATRO.hasMany(models.TTPHIEUTHU);
    }
  }
  NHATRO.init(
    {
      TenNT: DataTypes.STRING,
      Sdt: DataTypes.STRING,
      MoTa: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NHATRO",
    }
  );
  return NHATRO;
};
