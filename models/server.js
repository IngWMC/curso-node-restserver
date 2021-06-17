const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usariosRoute = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parseo del body ::: esto serializa toda la info del body a JSON
        this.app.use(express.json());

        // Define el acceso al directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usariosRoute, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;