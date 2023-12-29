const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const router = express.Router();


router.post('/sendEmail', (req, res) => {

  try{
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD 
      }
    });
    const { newEmail } = req.body; // Extract the "newEmail" field from the request body
    if (!newEmail) {
      return res.status(400).send({ message: 'Request must contain a "newEmail" field.' });
    }
  
    
    const mailOptions = {
      from: process.env.EMAIL, // Sender address from environment variables
      to: newEmail, // Recipient's email address from the POST request
      subject: 'Hello from Nodemailer', // Subject line
      text: 'This is a test email sent using Nodemailer.' // Plain text body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: 'There was an error sending the email.', error: error });
      }
      return res.status(200).send({ message: 'Email successfully sent.', info: info.response });
    });

  }catch (error){
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;