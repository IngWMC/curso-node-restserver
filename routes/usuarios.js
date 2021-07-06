const { Router } = require('express');
const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-role');
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole,
} = require('../middlewares/'); // No es necesario el index
const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
} = require('../helpers/db-validators');
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
router.put(
    '/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos,
    ],
    usuariosPut
);

router.post(
    '/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser más de 6 letras').isLength({
            min: 6,
        }),
        // check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom((correo) => emailExiste(correo)),
        // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRoleValido), // Validar con data de BD
        validarCampos,
    ],
    usuariosPost
);

router.delete(
    '/:id', [
        validarJWT,
        // esAdminRole, Esto valida que sea unicamente del rol ADMIN
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'), // Este middelware valida que se de varios roles
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosDelete
);

router.patch('/', usuariosPatch);

module.exports = router;