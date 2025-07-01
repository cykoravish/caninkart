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

// Update district by ID
router.put('/update/:id', async (req, res) => {
  const { name, state } = req.body;
  try {
    const updatedDistrict = await District.findByIdAndUpdate(
      req.params.id,
      { name, state },
      { new: true }
    );

    if (!updatedDistrict) {
      return res.status(404).json({ message: 'District not found' });
    }

    res.json({ message: 'District updated successfully', updatedDistrict });
  } catch (err) {
    res.status(500).json({ message: 'Error updating district', err });
  }
});

// Delete district by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedDistrict = await District.findByIdAndDelete(req.params.id);

    if (!deletedDistrict) {
      return res.status(404).json({ message: 'District not found' });
    }

    res.json({ message: 'District deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting district', err });
  }
});



module.exports = router;