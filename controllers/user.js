const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const {query} = req.query;

    res.json({
        msg: 'Test get - cont'
    });
}

const usuariosPost = (req , res = response) => {
    const {nombre, edad} = req.body;


    res.json({
        msg: 'Test post',
        nombre,
        edad
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