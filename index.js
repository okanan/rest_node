const express = require('express');

const routerAPI = require('./routes')

const { logErrors, errorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3001

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerAPI(app);
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
  console.log('servidor ON en puerto: ' + port)
})
