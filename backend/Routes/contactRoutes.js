// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { createMessage, getAllMessages , deleteMessage } = require('../Controllers/contactController');

router.post('/contact', createMessage); // To submit form
router.get('/contact', getAllMessages); // To fetch all messages
router.delete('/delete/:id' , deleteMessage)

module.exports = router;
