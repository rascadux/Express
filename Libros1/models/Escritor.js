const Sequelize = require('sequelize');
const db = require("../config/database");
module.exports = function(sequelize, DataTypes) {
  return db.define('Escritor', {
    EscritorId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    EscritorName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    EscritorNacionalidad: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    EscritorNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    EscritorFallecimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Escritor',
    timestamps: false
  });
};
