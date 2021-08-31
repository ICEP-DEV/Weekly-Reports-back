const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const connection = require('./config/config')
const http = require('http');

const login = require('./routes/login');
const hod = require('./routes/hod');
const lecture = require('./routes/lecture');
const register = require('./routes/register');
const bodyParser = require('body-parser');

const app = express();

const port = 4041;

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cors());

app.use('/login',login);
app.use('/hod',hod);
app.use('/lecture',lecture);
app.use('/register',register);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server started at port ' + port)
})