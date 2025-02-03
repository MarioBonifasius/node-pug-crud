const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Karyawan = sequelize.define('Karyawan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    divisi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING, // Menyimpan path file gambar
        allowNull: true,
    },
});

module.exports = Karyawan;
