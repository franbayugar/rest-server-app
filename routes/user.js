const { Router } = require('express');
const { usuariosGet, usuariosDelete, usuariosPatch, usuariosPut, usuariosPost } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet );

router.post('/', usuariosPost );

router.put('/:id', usuariosPut );

router.delete('/', usuariosPatch );

router.patch('/', usuariosDelete );


module.exports = router;