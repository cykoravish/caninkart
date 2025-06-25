const express = require('express');
const router = express.Router();
const District = require('../Models/District');


// Add state
router.post('/add', async (req, res) => {
  const { name, state } = req.body;
  try {
    const newDistrict = new District({ name, state });
    await newDistrict.save();
    res.status(201).json({ message: 'District created successfully' , newDistrict});
  } catch (err) {
    res.status(500).json({ message: 'Error creating district', err });
  }
});

//GET 

router.get('/:stateId', async (req, res) => {
    try{
        const district = await District.find({ state: req.params.stateId });
        res.json(district);
    }
    catch(err){
            res.status(500).json({ message: 'Error fetching district' ,err});
    }
    
})

module.exports = router;