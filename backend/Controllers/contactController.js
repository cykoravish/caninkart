// controllers/contactController.js
const Contact = require('../Models/contactModel');

// Create new contact message
exports.createMessage = async (req, res) => {
  try {
    const { name, email, contact, message } = req.body;

    if (!name || !email || !contact || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, contact, message });
    await newContact.save();

    res.status(201).json({ message: 'Message sent successfully', contact: newContact });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
};
