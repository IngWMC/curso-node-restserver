const { Router } = require('express');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

// :id => es para obtener los parametros enviados desde la URL
router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;