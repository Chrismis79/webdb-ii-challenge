const express = require('express');
const helmet = require('helmet');

const carsRouter = require('./cars/carsRouter');

const server = express();

server.use(express.json());
server.use(helmet());



server.get('/', (req, res) => {
    res.send('<h1>Cars API</h1>');
});
server.use('/api/cars', carsRouter);

module.exports = server;