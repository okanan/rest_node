const express = require('express');

const productos = require('./productos')


function routerAPI(app){
  const router = express.Router()
  app.use('/api/v1', router);
  router.use('/productos',productos)

}

module.exports = routerAPI