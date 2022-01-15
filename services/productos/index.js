const faker = require('faker');
const boom = require('@hapi/boom')

class productosServices {

  constructor(){
    this.productos = [];
    this.generar();
  }

  generar(){
    const limite = 10;

    for (let index = 0; index < limite; index++) {

      this.productos.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.productName(),
        precio: parseInt(faker.commerce.price(), 10),
        imagen: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean()
      })
      
    }
  }

  async listar(){
    return this.productos

  }

  async buscar(id){
    
    const producto = this.productos.find(item => item.id === id);

    if(!producto){
      throw boom.notFound('Producto no encontrado')
    }
    if(producto.isBlocked){
      throw boom.conflict('Producto esta bloqueado')
    }

    return producto

  }

  async eliminar(id){
    const productosFilter = this.productos.filter(item => item.id !== id);

    this.productos = productosFilter;

    return this.productos;

  }

  async actualizar(id, data){

    
    const productoBase = this.productos.filter(item => item.id === id);
    const productoIndex = this.productos.findIndex(item => item.id === id);
    
    if(productoIndex === -1){
      throw boom.notFound('Producto no encontrado')
    }
    const producto = productoBase[0]

    const update = {
      ...producto, 
      ...data
    }

    this.productos[productoIndex] = update    

    return this.productos[productoIndex]

  }

  async crear(data){
    const nuevoProducto = {
      id : faker.datatype.uuid(),
      ...data
    }

    this.productos.push(nuevoProducto);

    return nuevoProducto;

  }

}

module.exports = productosServices