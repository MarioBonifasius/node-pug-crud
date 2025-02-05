const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
console.log(__dirname)

// const db = new Sequelize('trial', 'root', '', {
const db = new Sequelize(config.database,config.username,config.password, {
  host: config.host,
  dialect: config.dialect,
});

db.authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Error connecting to database:', err));

module.exports = db;
