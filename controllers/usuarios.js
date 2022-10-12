const {response} = require('express');


const usuariosGet = (req, res = response) => {
    res.status(200).json({
        msg: 'get API - controlador'
    });
}

const usuariosPost = (req, res = response) => {
    res.status(201).json({
        msg: 'post API - controlador'
    });
}

const usuariosPut = (req, res = response) => {
    res.status(500).json({
        msg: 'put API - controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.status(500).json({
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