const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req = request, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt )

    // Guardar en BD

    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if( password ) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario);
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