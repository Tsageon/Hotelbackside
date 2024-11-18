const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'sagaetshepo@gmail.com', 
    pass: 'qsvb bwkk yhuo bnpm',   
  },
});


app.post('/send-confirmation', (req, res) => {
  const { recipientEmail, subject, textContent } = req.body;

  console.log("Received email data:", req.body); 
  const mailOptions = {
    from: 'sagaetshepo@gmail.com', 
    to: recipientEmail,           
    subject: subject,            
    text: textContent,           
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error sending email:", error);
      return res.status(500).send(`Error sending email: ${error.message}`);
    }
    console.log('Email sent:', info.response);
    res.status(200).send(`Confirmation email sent: ${info.response}`);
  });
});


app.get('/', (req, res) => {
  res.send('Server is running');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
