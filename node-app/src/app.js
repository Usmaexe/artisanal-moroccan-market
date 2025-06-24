require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Enhanced CORS setup for all routes and preflight
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://e-commerce-artisanal-moroccan.vercel.app'
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(cors({
  origin: allowedOrigins,
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
