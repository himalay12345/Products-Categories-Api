const http = require('http')
const port = '8000'
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('./swagger/CRUD.json')

const options = {
    swaggerDefinition:{
        info:{
            title:'Products & Categories API',
            version:'1.0.0',
            description:'[ Base URL: http://localhost:8000 ]'
        }
    },
    apis:["server.js"]

}


const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const db = require('./config/mongoose')

app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerJsDoc))
app.use(require('./routes/index'))


const server = http.createServer(app)
server.listen(port,(err) => {
    console.log('Server running on port ' + port)
})