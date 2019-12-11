const express = require('express');
const helmet = require('helmet');

const casrRouter = require('./cars/casrRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/cars', casrRouter);

server.get('/', (req, res) => {
    res.send('<h1>Cars API</h1>');
});

module.exports = server;