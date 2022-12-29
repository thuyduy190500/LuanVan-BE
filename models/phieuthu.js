"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PHIEUTHU extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PHIEUTHU.belongsTo(models.THANG);
      PHIEUTHU.belongsTo(models.PHONG);
    }
  }
  PHIEUTHU.init(
    {
      NgayLap: DataTypes.DATE,
      TongTien: DataTypes.FLOAT,
      TrangThai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PHIEUTHU",
    }
  );
  return PHIEUTHU;
};
