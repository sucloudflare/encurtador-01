// models/link.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Link = sequelize.define('Link', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Link;
