var DataTypes = require("sequelize").DataTypes;
var _Editorial = require("./Editorial");
var _Escritor = require("./Escritor");
var _Genero = require("./Genero");
var _Libro = require("./Libro");
var _LibroAutor = require("./LibroAutor");
var _LibroGenero = require("./LibroGenero");

function initModels(sequelize) {
  var Editorial = _Editorial(sequelize, DataTypes);
  var Escritor = _Escritor(sequelize, DataTypes);
  var Genero = _Genero(sequelize, DataTypes);
  var Libro = _Libro(sequelize, DataTypes);
  var LibroAutor = _LibroAutor(sequelize, DataTypes);
  var LibroGenero = _LibroGenero(sequelize, DataTypes);

  Libro.belongsToMany(Escritor, { through: "LibroAutor", foreignKey: "LibroId" });
  Escritor.belongsToMany(Libro, { through: "LibroAutor", foreignKey: "EscritorId"  });

  Libro.belongsToMany(Genero, { through: "LibroGenero", foreignKey: "LibroId" });
  Genero.belongsToMany(Libro, { through: "LibroGenero", foreignKey: "GeneroId" });

  Libro.belongsTo(Editorial, { as: "Editorial", foreignKey: "EditorialId"});
  Editorial.hasMany(Libro, { as: "Libros", foreignKey: "EditorialId"});
//  LibroAutor.belongsTo(Escritor, { as: "Escritor", foreignKey: "EscritorId"});
//  Escritor.hasMany(LibroAutor, { as: "LibroAutors", foreignKey: "EscritorId"});
//   LibroGenero.belongsTo(Genero, { as: "Genero", foreignKey: "GeneroId"});
//  Genero.hasMany(LibroGenero, { as: "LibroGeneros", foreignKey: "GeneroId"});
//  LibroAutor.belongsTo(Libro, { as: "Libro", foreignKey: "LibroId"});
//  Libro.hasMany(LibroAutor, { as: "LibroAutors", foreignKey: "LibroId"});
//  LibroGenero.belongsTo(Libro, { as: "Libro", foreignKey: "LibroId"});
//  Libro.hasMany(LibroGenero, { as: "LibroGeneros", foreignKey: "LibroId"});

  return {
    Editorial,
    Escritor,
    Genero,
    Libro,
    LibroAutor,
    LibroGenero,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
