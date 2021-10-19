'use strict';


const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const notFoundHandler = require('./error-handlers/404');
const serverErrorHandler = require('./error-handlers/500');

app.use(logger);

app.get('/test', (req, res) => {
  res.status(200).send('success on test route');
});

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.get('/person', validator, (req, res) => {  
  res.status(200).json({ name: req.query.name});
});


app.use('*', notFoundHandler);
app.use(serverErrorHandler);

const start = (port) => {
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
};

module.exports = {
  start,
  app,
};