const { response, json } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg:'No hay archivos que subir'});
        return;
    }

    // Imagenes
    const nombre = await subirArchivo(req.files)

    res.json({nombre})

}

module.exports = {
    cargarArchivo
}