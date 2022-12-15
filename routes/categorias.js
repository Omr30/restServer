const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener todas las categorias - publica
router.get('/', (req, res) => {
    res.json({
        msg: 'get'
    })
})

// Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get - id'
    })
})

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', (req, res) => {
    res.json({
        msg: 'post'
    })
})

// Actualizar - privado - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json({
        msg: 'put'
    })
})

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete'
    })
})

module.exports = router;