const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

router.get('/', obtenerProductos)

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)

router.post('/', [
    validarJWT,
    check('nombre', "El nombre es obligatorio").notEmpty(),
    check('categoria', "No es un id de Mongo Valido").isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto)


router.put('/:id', [
    validarJWT,
    // check('categoria', "No es un id de Mongo Valido").isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)

module.exports = router;