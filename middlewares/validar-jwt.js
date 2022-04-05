const { request } = require('express');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'Token ausente'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        //valid user
        if(!usuario){
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }


        //preg estado
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token inválido'
            })
        }
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}