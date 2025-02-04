const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = sequelize.define(
  'Karyawan',
  {
    
    nama: DataTypes.STRING,
    id_karyawan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    divisi: DataTypes.STRING,
    nomor_hp: DataTypes.INTEGER,
    nik: DataTypes.INTEGER,
    alamat: DataTypes.STRING,
    npwp: DataTypes.STRING,
    gdarah: DataTypes.STRING
  }
);