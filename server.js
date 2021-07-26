const http = require('http')
const port = '8000'
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('./swagger/CRUD.json')

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const db = require('./config/mongoose')

app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

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

app.use(morgan('tiny'));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerJsDoc))
app.use(require('./routes/index'))
app.use(function (req, res, next) {
	next(res.status(404).json({ message: "This APIs does not exist" }));
});

app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
	if (req.method == "OPTIONS") {
		res.status(200).end();
	} else {
		next();
	}
});


const server = http.createServer(app)
server.listen(port,(err) => {
    console.log('Server running on port ' + port)
})