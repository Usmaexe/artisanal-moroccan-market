require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Mount API routes under /api
app.use('/api', routes);

// Global error handler (should be last middleware)
app.use(errorHandler);

module.exports = app;
