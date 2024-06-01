const Sequelize = require('sequelize');
const db = require("../config/database");
module.exports = function(sequelize, DataTypes) {
  return db.define('Genero', {
    GeneroId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    GeneroName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Genero',
    timestamps: false
  });
};
