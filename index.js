const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors)
app.use(bodyParser.json());

// Nodemailer configuration for SMTP
const transporter = nodemailer.createTransport({
 service:"gmail",
  auth: {
    user: 'bluearpon4567@gmail.com', // Replace with your SMTP username
    pass: 'dtaecorslfbtvqoq', // Replace with your SMTP password or app-specific password
  },
  tls:{
    rejectUnauthorized:false
  }
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    console.log("ye")
  const { name, email, phone, state, options, message } = req.body;

  // Email content
  const mailOptions = {
    from: 'bluearpon4567@gmail.com', // Sender's email address
    to: 'krishukumar7827@gmail.com', // Recipient's email address
    subject: 'Form Submission',
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>State: ${state}</p>
      <p>Willing to invest: ${options}</p>
      <p>Remarks: ${message}</p>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Form submitted successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
