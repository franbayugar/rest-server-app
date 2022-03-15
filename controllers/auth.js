const bcryptjs = require('bcryptjs');
const {response} = require('express');
const Usuario = require('../models/usuario');

const login = async(req,res = response) =>{

    const {correo, password} = req.body;
    try {
        //se verifica si existe mail
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario o password incorrectos'
            });
        }
        
        //se verifica usuario activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario o password incorrectos -estado'
            });
        }
        //se verifica password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario o password incorrectos -pass'
            });
        }
        //se genera JWT
        

        res.json({
            msg:'Login ok'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salió mal'
        })
    }


}


module.exports = {
    login
}