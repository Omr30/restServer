const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');
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
    check('categoria', "La categoria es obligatoria").notEmpty(),
    check('descripcion', "Ingresa una descripcion del producto").notEmpty(),
    validarCampos
], crearProducto)


router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('precio', 'El precio es obligatorio').notEmpty(),
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