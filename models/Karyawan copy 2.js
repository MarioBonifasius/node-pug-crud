const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = sequelize.define(
  'Karyawans',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: DataTypes.STRING,
  id_karyawan: DataTypes.STRING,
  email: DataTypes.STRING,
  divisi: DataTypes.STRING,
  nomor_hp: DataTypes.STRING,
  nik: DataTypes.STRING,
  alamat: DataTypes.STRING,
  npwp: DataTypes.STRING,
  gdarah: DataTypes.STRING
}
);
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Karyawan extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Karyawan.init({
//     nama: DataTypes.STRING,
//     id_karyawan: DataTypes.STRING,
//     email: DataTypes.STRING,
//     divisi: DataTypes.STRING,
//     nomor_hp: DataTypes.STRING,
//     nik: DataTypes.STRING,
//     alamat: DataTypes.STRING,
//     npwp: DataTypes.STRING,
//     gdarah: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Karyawan',
//   });
//   return Karyawan;
// };