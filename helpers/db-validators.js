const Role = require('../models/role');
const Usuario = require('../models/usuario')

const roleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado`);
    }
}

const existeEmail = async (correo = '')=>{
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioID = async (id = '')=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    roleValido,
    existeEmail,
    existeUsuarioID
}