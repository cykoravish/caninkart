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
    const countries = await Country.find();
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




module.exports = router;



