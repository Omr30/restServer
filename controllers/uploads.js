const { response } = require("express");


const cargarArchivo = async(req, res = response) => {
    res.json({
        msg: 'GET'
    })
}

module.exports = {
    cargarArchivo
}