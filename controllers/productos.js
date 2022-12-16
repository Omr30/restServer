const { response } = require("express");
const {Producto} = require("../models");


const obtenerProductos = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = {estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
               .skip(desde)
               .limit(limite)
               .populate('usuario', 'nombre')
               .populate('categoria', 'usuario')
    ])

    res.json({
        total,
        productos,
    })

}

const obtenerProducto = async(req, res = response) => {
    const {id} = req.params
    const producto = await Producto.findById(id).populate('usuario', 'nombre')
    res.json(producto)
}


const crearProducto = async(req, res = response) => {

    const {nombre, precio, descripcion, categoria} = req.body

    const productoDB = await Producto.findOne({nombre})

    if(productoDB){
        return res.status(400).json({
            msg: `La categoria ${productoDB.nombre}, ya existe`
        })
    }
    

    // console.log(await Categoria.findOne({categoria}));

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria: req.usuario._id,
        precio,
        descripcion
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto)

}

const actualizarProducto = async(req, res = response) => {
    const { id } = req.params
    const {usuario, estado, categoria, ...data} = req.body

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json(producto)

}

const borrarProducto = async(req, res = response) => {
    const {id} = req.params

    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(producto)
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}