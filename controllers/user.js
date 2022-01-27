const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {
    const { limit = 5, desde = 0} = req.query;
    const query = {estado:true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query),
            Usuario.find(query)
            .skip(Number(desde))
                .limit(Number(limit))
    ]);

    // let total = await Usuario.countDocuments(query);
    // if(!(Number.isInteger(limit) || Number.isInteger(desde))){
    // usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //         .limit(Number(limit));

    // }else{
    //     usuarios = await Usuario.find(query);
    // }


    res.json({
        total,
        usuarios
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

    res.json(
        usuario
    );
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;

    const {_id, password, google, correo, ... info} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        info.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, info);
    
    res.json({
        msg: 'Test put',
        usuarioDB
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Test patch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false}); 
    res.json({
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}