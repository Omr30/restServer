const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImg } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', cargarArchivo)

router.put('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(e => (coleccionesPermitidas(e,['usuario', 'productos']))),
    validarCampos
], actualizarImg)

module.exports = router;