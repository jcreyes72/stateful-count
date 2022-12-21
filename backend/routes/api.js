const express = require('express');

const router = express.Router();

const currentState = require('../models/currentState')

// Route
router.get('/', (req, res) => {

    currentState.find({ })
        .then((data) => {
            console.log('Data: ', data)
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', data)
        });

});

router.put('/update', (req, res) => {
    const data = req.body.currentCount;
  
    // Find the existing count and update it
    currentState.findOneAndUpdate({}, {state: data}, {upsert: true}, (error, doc) => {
      if (error) {
        res.status(500).json({msg: "Whoops, internal server error :("});
      } else {
        res.json({
          msg: "The current state has been updated"
        });
      }
    });
  });
  

module.exports = router;