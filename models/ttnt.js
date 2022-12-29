"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TTNT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TTNT.belongsTo(models.THANHPHO);
      TTNT.belongsTo(models.NHATRO);
      TTNT.belongsTo(models.QUAN);
      TTNT.belongsTo(models.PHUONG);
      TTNT.belongsTo(models.DUONG);
    }
  }
  TTNT.init(
    {
      DICHVUId: DataTypes.JSON,
      LOAIPHONGId: DataTypes.JSON,
      GiaDien: DataTypes.STRING,
      GiaNuoc: DataTypes.STRING,
      MoTa: DataTypes.STRING,
      Sdt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TTNT",
    }
  );
  return TTNT;
};
