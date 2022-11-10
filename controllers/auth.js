const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try{
        // Verificar si el email existe

        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Si el ususario esta activo

        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT



        res.json({
            msg: 'Login ok'
        })

    } catch (error){
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}

module.exports = {
    login
};