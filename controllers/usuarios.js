const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { Usuario } = require('../models');

const usuariosGet = async (req = request, res = response) => {
    // req.query => se obtiene todos los query params de la URL
    // const { page = '1', limit } = req.query;
    const { limite = 5, desde = 5 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
        total,
        usuarios,
    });
};

const usuariosPut = async (req, res = response) => {
    // req.params => se obtiene todos los parametros de la URL
    const { id } = req.params;

    const { password, google, correo, ...resto } = req.body;

    // Validar si existe el id en la BD

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'put API - controlador',
        usuario,
    });
};

const usuariosPost = async (req, res = response) => {
    // req.body => se obtiene la info que es enviado en el body
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'Ese correo ya existe',
    //     });
    // }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario,
    });
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrando físicamente de la BD
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador',
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
};