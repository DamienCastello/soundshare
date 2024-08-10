'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 20]
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 20]
        }
      },
      resourceLink: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          foreignKey: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Resources');
  }
};