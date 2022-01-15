const express = require('express')
const faker = require('faker')
const serviciosProductos = require('../../services/productos')
const validatorHandler = require('../../middlewares/validator.handler')
const  { createProductSchema, updateProductSchema, getProductSchema } = require('../../schemas/productos/schema')
const router = express.Router()
const servicios = new serviciosProductos();

router.get('/', async (req,res) => {
  const productos = await servicios.listar()
  res.json(productos)
});

router.get('/:id',  
  validatorHandler(getProductSchema, 'params' ),
  async (req,res, next) => {
    try {
      const { id } = req.params  
      const producto = await servicios.buscar(id)  
      res.json(producto)    

    } catch (error) {
      next(error)
    } 
});

router.post('/', 
  validatorHandler(createProductSchema, 'body'),
  async (req,res) => {
  const body = req.body;
  const nuevoProducto = await servicios.crear(body)
  res.status(201).json(nuevoProducto)
});

router.patch('/:id', 
  validatorHandler(getProductSchema, 'params' ),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {

  try {
    const { id } = req.params;
    const body = req.body;
  
    const actualizarProducto = await servicios.actualizar(id, body)
  
    res.json({
      message: 'Producto actualizado',
      item: actualizarProducto,
      id,
    });  
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req,res) => {

  const { id } = req.params

  const removerProducto = await servicios.eliminar(id);

  res.status(201).json({
    estado: 'ok',
    mensaje: 'producto eliminado',
    listado: removerProducto
  });
});

module.exports = router