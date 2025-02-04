const { Sequelize } = require('sequelize');

// const db = new Sequelize('trial', 'root', '', {
const db = new Sequelize('trial2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

db.authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Error connecting to database:', err));

module.exports = db;
