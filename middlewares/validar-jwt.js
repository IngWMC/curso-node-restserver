const { response, request } = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario que corresponda al uid
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res
                .status(401)
                .json({ msg: 'Token inválido - usuario no existe en BD' });
        }

        // Verificar si el uid tiene el estado TRUE
        if (!usuario.estado) {
            return res
                .status(401)
                .json({ msg: 'Token inválido - usuario con estado FALSE' });
        }

        req.usuario = usuario;

        next(); // Para que continue con el siguiente
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token inválido' });
    }
};

module.exports = { validarJWT };