const express = require("express");
const router = express.Router();

const librosController = require('../controllers/libroController');

router.get("/", librosController.listarLibros);
router.get("/:id",librosController.editarLibro);
router.get("/nuevo",librosController.nuevoLibro);
router.post ("/guardar", librosController.guardarLibro);
router.get("/borrar/:id", librosController.borrarLibro);

module.exports = router;