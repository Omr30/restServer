const {response, request} = require('express');
const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = async(req = request, res = response) => {

    const body = req.body;
    const usuario = new Usuario( body );

    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};