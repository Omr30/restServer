const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg:'No hay archivos que subir'});
        return;
    }

    try{
        // Imagenes
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos')
        const nombre = await subirArchivo(req.files, undefined, 'imgs')
        res.json({nombre}) 
    }catch(error){
        res.status(400).json({
            msg: error
        })
    }
}

const actualizarImg = async(req, res = response) => {

    const {id, coleccion} = req.params;

    res.json({
        id,
        coleccion
    })
}

module.exports = {
    cargarArchivo,
    actualizarImg
}