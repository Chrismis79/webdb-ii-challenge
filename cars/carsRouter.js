const express = require('express');
const db = require('./cars-Model');

const router = express.Router();

router.use((req, res, next) => {
    console.log("Cars router");
    next();
  })

router.get('/', (req, res) => {
    db.get(req.query)
        .then(car => {
            res.status(200).json(car);
        })
        .catch(err => {
            console.log("Error with GET api/cars/", err);
            res.status(500).json({message: "Error fetching list of cars."})
        })
});

router.post('/', (req, res) => {
    db.insert(req.body)
      .then(car => {
        res.status(201).json(car);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({message: 'Error adding new car'});
      });
  
  });

module.exports = router;