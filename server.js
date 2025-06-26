const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage
const applications = [];

// Serve the admission form
app.get('/admission', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admission.html'));
});

// Handle form submission
app.post('/admission', (req, res) => {
  const { fullName, email, phone, course } = req.body;

  // Store in memory
  applications.push({ fullName, email, phone, course });

  res.send(`
    <h2>Thank you, ${fullName}!</h2>
    <p>You’ve successfully applied for the <strong>${course}</strong> program.</p>
    <a href="/admission">Back to form</a>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/admission`);
});
