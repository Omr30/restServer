const express = require('express');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares

        this.middlewares();

        // Rutas de mi app

        this.routes();
    }

    middlewares() {
        // Directorio Publico
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World');
        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        });
    }

}

module.exports = Server;