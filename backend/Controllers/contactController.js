// controllers/contactController.js
const Contact = require('../Models/contactModel');
const nodemailer = require('nodemailer');
// Create new contact message
exports.createMessage = async (req, res) => {
  
  try {
    const { name, email, contact, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email app password (not your email login password)
      },
    })
    

     const mailOptions = {
     from: `"${name}" <${email}>`, // sender address

      to: process.env.EMAIL_USER_to, // your receiving email
      subject: `New Enquiry from ${name}`,
     html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #0044cc;">New Enquiry Received</h2>
    <p>You have received a new message through your website contact form. Here are the details:</p>

    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ccc;"><strong>Name:</strong></td>
        <td style="padding: 8px; border: 1px solid #ccc;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ccc;"><strong>Email:</strong></td>
        <td style="padding: 8px; border: 1px solid #ccc;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ccc;"><strong>Contact Number:</strong></td>
        <td style="padding: 8px; border: 1px solid #ccc;">${contact}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ccc;"><strong>Message:</strong></td>
        <td style="padding: 8px; border: 1px solid #ccc;">${message}</td>
      </tr>
    </table>

    <p style="margin-top: 20px;">Please get in touch with the enquirer at your earliest convenience.</p>

    <hr style="margin: 30px 0;">
    <p style="font-size: 12px; color: #777;">This message was sent automatically from your website contact form.</p>
  </div>
`
,
    };

    await transporter.sendMail(mailOptions);
    

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


// Delete a contact message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
};
