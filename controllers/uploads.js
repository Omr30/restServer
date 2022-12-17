const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");

const cargarArchivo = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg:'No hay archivos que subir'});
        return;
    }

    const {archivo} = req.files;
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1]

    // Validar la extension
    const  extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']
    if(!extensionesValidas.includes(extension)){
        res.status(400).json({
            msg:`La extension ${extension} no es permitida, ${extensionesValidas}`
        })
    }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', nombreTemp)

    archivo.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).send(err);
        }

            res.json({msg:'El archivo se subio a ' + uploadPath});
        })

}

module.exports = {
    cargarArchivo
}