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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.getById(id)
        .then(car => {
              res.status(200).json(car);
        })
        .catch(err => {
            console.log("Error with GET api/cars/:id", err);
            res.status(404).json({ message: "The car with the specified ID does not exist."})
        });
});

router.post('/', (req, res) => {
    const carData = req.body;
    if(!carData.VIN || !carData.make || !carData.model){
        res.status(400).json({ errorMessage: "Please provide VIN, make and model for the car."})
    }else {
    db.insert(req.body)
      .then(car => {
        res.status(201).json(car);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({message: 'Error adding new car'});
      });
    }
  });

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.remove({id})
      .then(item => {
          if(!item.length){
            res.send(404).json({error: "The car with the specified ID does not exist." })
          }else{
            res.status(204).json({message: "Car was removed successfully"})
          }//my validations aren't working??
      })
      .catch(err => {
        console.log("There was an error on DELETE /api/cars/:id", err)
        res.status(500).json({
          message: "Error removing car"
        })
      });
    
  });
  
  router.put('/:id', (req, res) => {
      const {id} = req.params;
      const {VIN, make, model, mileage} = req.body;
      if(!id){
          res.status(404).json({message: "Car with that id doesn't exist."})
      }else {
      db.update(id, {VIN, make, model, mileage})
        .then(car => res.status(200).json(car))
        .catch(err => {
            console.log("There was an error on PUT /api/cars/:id", err)
            res.status(500).json({
            message: 'Error updating car information'
          })
        });
    }
  });

module.exports = router;