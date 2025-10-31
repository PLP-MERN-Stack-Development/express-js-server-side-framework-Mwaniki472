// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in Middleware
app.use(express.json());

// Custom Middleware
app.use(logger);
app.use(authenticate);

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Express.js + MongoDB REST API is running');
});

app.use('/api/products', productRoutes);

// Global Error Handler
app.use(errorHandler);

// MongoDB Connection + Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));
