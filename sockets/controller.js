const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models");

const chatMensajes = new ChatMensajes()

const socketController = async(socket, io) => {
    const token = socket.handshake.headers['x-token'];
    const usuario =  await comprobarJWT(token)
    if(!usuario){
        return socket.disconnect()
    }
    // Agregar el usuario conectado
    chatMensajes.conectarUsuario(usuario)
    io.emit('usuarios-activos', chatMensajes.usuariosArr)
    
    // Limpiar cuando alguien se desconecto
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensajes.usuariosArr)
    })

}

module.exports = {socketController}