'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'This is not a valid email address',
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 20],
            msg: 'the username length should be from 2 to 20 chars',
          },
        },
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
