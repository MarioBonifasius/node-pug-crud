const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = sequelize.define( 'Log',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: DataTypes.STRING,
  id_karyawan: DataTypes.STRING,
}
);

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Log extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Log.init({
//     nama: DataTypes.STRING,
//     id_karyawan: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Log',
//   });
//   return Log;
// };