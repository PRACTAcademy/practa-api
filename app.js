'use strict';

const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_1,
  process.env.ALLOWED_ORIGIN_2,
  process.env.ALLOWED_ORIGIN_3,
  process.env.ALLOWED_ORIGIN_4
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    console.log('Origin:', origin);
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('combined'));

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
  const route = require(path.join(routesPath, file));
  app.use(route);
});

app.use((err, req, res, _next) => {
  console.error('Global error handler:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
