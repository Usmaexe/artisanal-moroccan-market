require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Enable CORS and JSON body parsing
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://e-commerce-artisanal-moroccan.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Mount API routes under /api
app.use('/api', routes);

// Global error handler (should be last middleware)
app.use(errorHandler);

// Export the express app for Vercel
module.exports = app;

// Export handler for serverless
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
  });
}
