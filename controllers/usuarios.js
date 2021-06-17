const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {
    // req.query => se obtiene todos los query params de la URL
    const { page = '1', limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        page,
        limit,
    });
};

const usuariosPut = (req, res = response) => {
    // req.params => se obtiene todos los parametros de la URL
    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id,
    });
};

const usuariosPost = (req, res = response) => {
    // req.body => se obtiene la info que es enviado en el body
    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        body,
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador',
    });
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