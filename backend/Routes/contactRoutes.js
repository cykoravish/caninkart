// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { createMessage, getAllMessages } = require('../Controllers/contactController');

router.post('/contact', createMessage); // To submit form
router.get('/contact', getAllMessages); // To fetch all messages

module.exports = router;
