const { Router } = require('express');
const { usuariosGet, usuariosDelete, usuariosPatch, usuariosPut, usuariosPost } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { roleValido, existeEmail } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener más de 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(  roleValido ),
    validarCampos
    
], usuariosPost );

router.put('/:id', usuariosPut );

router.delete('/', usuariosPatch );

router.patch('/', usuariosDelete );


module.exports = router;