const path = require('path');
const fs = require('fs');

const { response, request } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req = request, res = response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, 'imgs');
    res.json({
      nombre
    })
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

const actualizarImagen = async (req = request, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con el id: ${id}`,
        })
      }

      break;
    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con el id: ${id}`,
        })
      }

      break;

    default:
      return res.status(500).json({
        msg: 'Se me olvidó validar esto'
      })
  }

  // Verificar si la imagen existe
  if (modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
    console.log('entro 1....', pathImagen)
    if (fs.existsSync(pathImagen)) {
      console.log('entro 2....')
      fs.unlinkSync(pathImagen);
    }
  }

  try {
    const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombreArchivo;
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  await modelo.save();
  res.status(201).json(modelo);
};

const mostrarImagen = async (req = request, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con el id: ${id}`,
        })
      }

      break;
    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con el id: ${id}`,
        })
      }

      break;

    default:
      return res.status(500).json({
        msg: 'Se me olvidó validar esto'
      })
  }

  // Verificar si la imagen existe
  if (modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.join(__dirname, '../uploads', 'no-image.jpeg');
  res.sendFile(pathImagen);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
}