const Sequelize = require('sequelize');
const db = require("../config/database");
module.exports = function(sequelize, DataTypes) {
  return db.define('Editorial', {
    EditorialId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    EditorialName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    EditorialWeb: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Editorial',
    timestamps: false
  });
};
