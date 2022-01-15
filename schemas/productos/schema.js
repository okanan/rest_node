const joi = require('joi');

const id = joi.string().uuid();
const nombre = joi.string().min(3).max(15);
const precio = joi.number().integer().min(10);
const imagen = joi.string().uri();

const createProductSchema = joi.object({
  nombre: nombre.required(),
  precio: precio.required(),
  imagen: imagen.required()
});

const updateProductSchema = joi.object({
  nombre: nombre,
  precio: precio,
  imagen: imagen
})

const getProductSchema = joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }