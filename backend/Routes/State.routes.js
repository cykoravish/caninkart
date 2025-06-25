const express = require('express');
const router = express.Router();
const State = require('../Models/state');

// Add state
router.post('/add', async (req, res) => {
  const { name, country } = req.body;
  try {
    const newState = new State({ name, country });
    await newState.save();
    res.status(201).json({ message: 'State created successfully' , newState});
  } catch (error) {
    res.status(500).json({ message: 'Error creating state' });
  }
});

// Get states by country ID
router.get('/:countryId', async (req, res) => {
  try {
    const states = await State.find({ country: req.params.countryId });
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching states' });
  }
});

module.exports = router;
