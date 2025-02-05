'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('karyawans', 'status', {
                  type: Sequelize.STRING
              }, { transaction: t }),
              queryInterface.addColumn('karyawans', 'delete_at', {
                  type: Sequelize.DATE,
              }, { transaction: t }),
              queryInterface.addColumn('karyawans', 'resign', {
                  type: Sequelize.DATE,
              }, { transaction: t })
          ])
      })
  }
};