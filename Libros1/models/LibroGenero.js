const Sequelize = require('sequelize');
const db = require("../config/database");
module.exports = function(sequelize, DataTypes) {
  return db.define('LibroGenero', {
    LibroId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Libro',
        key: 'LibroId'
      },
      unique: true
    },
    GeneroId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Genero',
        key: 'GeneroId'
      },
      unique: true
    }
  }, {
    sequelize,
    tableName: 'LibroGenero',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_LibroGenero_1",
        unique: true,
        fields: [
          { name: "LibroId" },
          { name: "GeneroId" },
        ]
      },
    ]
  });
};
