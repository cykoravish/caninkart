const express = require('express');
const router = express.Router();
const Country = require('../Models/Country');
const State = require('../Models/state');
const District = require('../Models/District');

// Add country
router.post('/add', async (req, res) => {
  const { name } = req.body;
  try {
    const newCountry = new Country({ name });
    await newCountry.save();
    res.status(201).json({ message: 'Country created successfully', newCountry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating country', error });
  }
});

// Get all countries
router.get('/view', async (req, res) => {
  try {
    const countries = await Country.find().sort({createdAt : - 1});
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries',error });
  }
});

router.get('/hierarchy', async (req, res) => {
  try {
    const countries = await Country.find();

    const result = await Promise.all(
      countries.map(async (country) => {
        const states = await State.find({ country: country._id });

        const statesWithDistricts = await Promise.all(
          states.map(async (state) => {
            const districts = await District.find({ state: state._id });
            return {
              _id: state._id,
              name: state.name,
              districts,
            };
          })
        );

        return {
          _id: country._id,
          name: country.name,
          states: statesWithDistricts,
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hierarchy', error });
  }
});

// DELETE Country
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Country.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json({ message: 'Country deleted successfully', deleted });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting country', error });
  }
});

// UPDATE Country
router.put('/update/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Country.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json({ message: 'Country updated successfully', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating country', error });
  }
});



module.exports = router;



