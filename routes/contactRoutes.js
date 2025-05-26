const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// GET /api/contact - fetch all contact messages
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});


// Delete a contact message by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



// Send reply email to a contact message
// router.post('/reply', async (req, res) => {
//   const { toEmail, subject, message } = req.body;

//   if (!toEmail || !subject || !message) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Configure nodemailer transporter (use your SMTP settings here)
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || 'smtp.example.com',
//       port: process.env.SMTP_PORT || 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.SMTP_USER || 'your_email@example.com',
//         pass: process.env.SMTP_PASS || 'your_email_password',
//       },
//     });

//     const mailOptions = {
//       from: `"Traveler Support" <${process.env.SMTP_USER || 'your_email@example.com'}>`,
//       to: toEmail,
//       subject,
//       text: message,
//       // html: `<p>${message}</p>`, // optional if you want HTML email
//     };

//     // Send mail
//     await transporter.sendMail(mailOptions);

//     res.json({ message: 'Reply sent successfully' });
//   } catch (error) {
//     console.error('Error sending reply email:', error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// });

// Example for Express.js
router.get('/unread-count', async (req, res) => {
  const count = await ContactMessage.countDocuments({ isRead: false });
  res.json({ unread: count });
});

// PATCH /api/contact/mark-read - mark all messages as read
router.patch('/mark-read', async (req, res) => {
  try {
    await ContactMessage.updateMany({ isRead: false }, { $set: { isRead: true } });
    res.status(200).json({ message: 'All messages marked as read' });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ error: 'Failed to update messages' });
  }
});


module.exports = router;
