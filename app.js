const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const connection = require('./config/config')

const login = require('./routes/login');
const hod = require('./routes/hod');
const lecture = require('./routes/lecture');
const register = require('./routes/register');

const app = express();

const port = 4041;

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.use(cors());

app.use('/login',login);
app.use('/hod',hod);
app.use('/lecture',lecture);
app.use('/lectregisterure',register);



app.use('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server started at port ' + port)
})