const Sequelize = require('sequelize');
const db = require("../config/database");
module.exports = function(sequelize, DataTypes) {
  return db.define('Libro', {
    LibroId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    EditorialId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Editorial',
        key: 'EditorialId'
      }
    },
    LibroName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    YearReleased: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Libro',
    timestamps: false
  });
};
