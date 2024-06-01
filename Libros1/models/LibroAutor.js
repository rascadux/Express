const Sequelize = require('sequelize');
const db = require("../config/database");
module.exports = function(sequelize, DataTypes) {
  return db.define('LibroAutor', {
    LibroId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Libro',
        key: 'LibroId'
      },
      unique: true
    },
    EscritorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Escritor',
        key: 'EscritorId'
      },
      unique: true
    }
  }, {
    sequelize,
    tableName: 'LibroAutor',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_LibroAutor_1",
        unique: true,
        fields: [
          { name: "LibroId" },
          { name: "EscritorId" },
        ]
      },
    ]
  });
};
