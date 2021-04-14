var express = require('express')
var cors = require('cors')
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Message = require('./api/models/msgModel')
User= require('./api/models/userModel')
Endereco = require('./api/models/enderecoModel'),
Agenda = require('./api/models/agendaModel'),
bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/msgdb');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
var routes = require('./routes');
routes(app);


app.listen(port);
console.log('Message RESTful API server started on: ' + port);