const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({rol});
    if( !existeRol ){
            throw new Error(`El rol ${ rol } no está registrado en la DB`)
    }

}

const emailExiste = async( correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo: ${ correo }, ya se encuentra registrado en la DB`)
    }

}

module.exports = {
    esRoleValido,
    emailExiste
};