const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('body-parser');


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

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error){
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body

    try{

        const {name, picture, email} = await googleVerify(id_token)

        res.json({
            msg: 'Todo bien google signin',
            id_token
        })


    }catch(err){
        json.status(400).json({
            ok:false,
            msg: 'El Token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSignIn
};