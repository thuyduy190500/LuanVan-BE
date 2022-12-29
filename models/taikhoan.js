'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaiKhoan.init({
    tendn: DataTypes.STRING,
    email: DataTypes.STRING,
    matkhau: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaiKhoan',
  });
  return TaiKhoan;
};