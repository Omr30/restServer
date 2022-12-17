const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImg } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir, validarCampos } = require('../middlewares');


const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(e => (coleccionesPermitidas(e,['usuarios', 'productos']))),
    validarCampos
], actualizarImg)

module.exports = router;