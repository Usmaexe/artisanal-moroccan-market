require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Enhanced CORS setup
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000', 
  'https://e-commerce-artisanal-moroccan.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Artisan Marketplace API is running!' });
});

// In src/app.js, add this before mounting routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mount API routes under /api
app.use('/api', routes);

// Global error handler (should be last middleware)
app.use(errorHandler);

module.exports = app;