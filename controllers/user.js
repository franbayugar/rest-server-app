const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = (req = request, res = response) => {
    const {query} = req.query;

    res.json({
        msg: 'Test get - cont'
    });
}

const usuariosPost = async (req , res = response) => {


    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar password
    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    const {nombre, edad} = req.body;


    res.json({
        msg: 'Test put',
        id,
        nombre,
        edad
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Test patch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Test del'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}