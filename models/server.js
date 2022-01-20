

const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'))
    }


    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World')
        });

        this.app.get('/api', (req, res) => {
            res.send('Hello World')
        });

    }

    start() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;