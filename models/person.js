// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Person extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Person.init({
//     first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
//     address: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     ktp: DataTypes.STRING,
//     gender: DataTypes.STRING,
//     bio: DataTypes.TEXT
//   }, {
//     sequelize,
//     // modelName: 'Person',
//   });
//   return Person;
// };
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = sequelize.define(
  'Person',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    ktp: DataTypes.STRING,
    gender: DataTypes.STRING,
    bio: DataTypes.TEXT

  }
);