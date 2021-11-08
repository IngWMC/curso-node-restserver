const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existeProductoPorId),
], obtenerProducto);

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un id de Mongo Válido').isMongoId(),
  check('categoria').custom(existeCategoriaPorId),
  validarCampos
], crearProducto);

router.put('/:id', [
  validarJWT,
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria').custom(existeCategoriaPorId),
  validarCampos
], actualizarProducto);

router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id Mongo válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos,
], eliminarProducto);

module.exports = router;