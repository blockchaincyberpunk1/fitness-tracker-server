const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const activitiesRouter = require('./routes/activities');
require('dotenv').config();


/**
 * Main application file for the Fitness Tracker.
 * @module app
 */

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

/**
 * Connects to MongoDB using Mongoose.
 * The MongoDB URL is stored in an environment variable for security.
 */
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/activities', activitiesRouter);

/**
 * Error handling middleware.
 * Catches and handles all unhandled errors in the application.
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;
