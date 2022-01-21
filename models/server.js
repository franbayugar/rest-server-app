const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(cors())

        //lectura y parseo de body
        this.app.use(express.json());

        //public
        this.app.use(express.static('public'))
    }


    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));

    }

    start() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;