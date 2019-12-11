const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(car => {
            res.status(200).json(car);
        })
        .catch(err => {
            console.log("Error with GET api/cars/", err);
            res.status(500).json({message: "Error fetching list of cars."})
        });
});