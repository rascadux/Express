var initModels = require("../models/init-models");
const sequelize = require("sequelize");
var models = initModels(sequelize);

const controller = {};

// Borrar relaciones de libro  /////////////////////////////////////////////////////////////////////////////////////////
controller.borrarRelacionesLibro = async function (libroid) {

    await models.LibroGenero.destroy (
        {where: {
                LibroId: libroid
            }
        }
    );
    await models.LibroAutor.destroy (
        {where: {
                LibroId: libroid
            }
        }
    );
};

// Listar libros /////////////////////////////////////////////////////////////////////////////////////////////////////
controller.listarLibros = async function (req, res, next) {
    try {
        await models.Libro
            .findAll({include: [
                    models.Escritor,
                    models.Genero,
                    {
                        model: models.Editorial,
                        as: "Editorial"
                    }]})
                    }]})
            .then(async (data) => {
                //res.json(data);
                res.render("index", {libros: data});
            });
    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};

// Editar libros //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.editarLibro = async function (req, res, next) {
    try {
        const libro = await models.Libro.findOne({
            where: {
                LibroId: req.params.id,
            },
        include: [
            models.Escritor,
            models.Genero,
            {
                model: models.Editorial,
                as: "Editorial"
            }]
        });
        const escritores = await models.Escritor.findAll();
        const generos = await  models.Genero.findAll();
        const editoriales = await  models.Editorial.findAll();
        res.render("libro", {libro: libro, escritores: escritores, generos: generos, editoriales: editoriales});

    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};

// Guardar libro //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.guardarLibro = async function (req, res, next) {
    try {
        var libro;
        if (typeof req.body.id != "undefined" && req.body.id != '') {
            libro = await models.Libro.findOne({
                where: {
                    LibroId: req.body.id
                }
            });

            // Actualizar libro ------------------------------------
            if (libro) {
                await libro.update(
                    {
                        EditorialId: req.body.editorial,
                        LibroName: req.body.titulo,
                        YearReleased: req.body.anyo
                    }
                );

                await controller.borrarRelacionesLibro (req.body.id);

            }
         // Crear nuevo libro ------------------------------------
        } else {
            libro = await models.Libro.create(
                {
                        EditorialId: req.body.editorial,
                        LibroName: req.body.titulo,
                        YearReleased: req.body.anyo}
                );
        }
        // Actualizar relaciones -----------------------------------

        var array = Array.isArray(req.body.escritores) ? req.body.escritores : [req.body.escritores];

        array.forEach (escritor => {
            models.LibroAutor.create(
                {
                    LibroId: libro.LibroId,
                    EscritorId: escritor
                }
            );
        });

        array = Array.isArray(req.body.generos) ? req.body.generos : [req.body.generos];

        array.forEach (genero => {
            models.LibroGenero.create(
                {
                    LibroId: libro.LibroId,
                    GeneroId: genero
                }
            );
        });

        res.redirect('/');

    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};

// Nuevo libro //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.nuevoLibro = async function (req, res, next) {
    const escritores = await models.Escritor.findAll();
    const generos = await  models.Genero.findAll();
    const editoriales = await  models.Editorial.findAll();

    res.render("libro", {libro: libro, escritores: escritores, generos: generos, editoriales: editoriales})
};

// Borrar libro //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.borrarLibro = async function (req, res, next) {

    await controller.borrarRelacionesLibro (req.params.id);

    const libro = await models.Libro.findOne({
        where: {
            LibroId: req.params.id
        }
    });
    await libro.destroy();
    res.redirect("/");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = controller;