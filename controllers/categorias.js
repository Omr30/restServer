const { response } = require("express");
const {Categoria} = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
               .skip(desde)
               .limit(limite)
               .populate('usuario', 'nombre')
    ])

    res.json({
        total,
        categorias,
    })

}

// obtenerCategoria - populate {}

const obtenerCategoria = async(req, res = response) => {
    const {id} = req.params
    const category = await Categoria.findById(id).populate('usuario', 'nombre')
    res.json(category)
}


const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria)

}

// actualizarCategoria recibir el nombre
const actualizarCategoria = async(req, res = response) => {
    const { id } = req.params
    const {usuario, estado, ...data} = req.body

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

    res.json(categoria)

}

// borrarCategoria - estado:false
const borrarCategoria = async(req, res = response) => {
    const {id} = req.params

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(categoria)
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    borrarCategoria,
    actualizarCategoria,
    obtenerCategoria
}