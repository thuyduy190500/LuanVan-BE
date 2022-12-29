"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TTPHIEUTHU extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TTPHIEUTHU.belongsTo(models.THANG);
      TTPHIEUTHU.belongsTo(models.PHONG);
      TTPHIEUTHU.belongsTo(models.NHATRO);
    }
  }
  TTPHIEUTHU.init(
    {
      NgayLap: DataTypes.DATE,
      TongTien: DataTypes.FLOAT,
      CSDienCu: DataTypes.INTEGER,
      CSDienMoi: DataTypes.INTEGER,
      CSNuocCu: DataTypes.INTEGER,
      CSNuocMoi: DataTypes.INTEGER,
      TrangThai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TTPHIEUTHU",
    }
  );
  return TTPHIEUTHU;
};
