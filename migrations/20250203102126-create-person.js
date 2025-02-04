// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('People', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       first_name: {
//         type: Sequelize.STRING
//       },
//       last_name: {
//         type: Sequelize.STRING
//       },
//       address: {
//         type: Sequelize.STRING
//       },
//       phone: {
//         type: Sequelize.STRING
//       },
//       ktp: {
//         type: Sequelize.STRING
//       },
//       gender: {
//         type: Sequelize.STRING
//       },
//       bio: {
//         type: Sequelize.TEXT
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('People');
//   }
// };