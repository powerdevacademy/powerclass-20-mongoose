const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/usuarios', userRoute);
app.use('/produtos', productRoute);

module.exports = app;
