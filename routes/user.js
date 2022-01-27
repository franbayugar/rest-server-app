const { Router } = require('express');
const { usuariosGet, usuariosDelete, usuariosPatch, usuariosPut, usuariosPost } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { roleValido, existeEmail, existeUsuarioID } = require('../helpers/db-validators');

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

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioID),
    check('rol').custom(  roleValido ),
    validarCampos
], usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
] ,usuariosDelete );


module.exports = router;