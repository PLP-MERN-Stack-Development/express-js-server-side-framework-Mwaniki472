// models/Product.js
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const validateProduct = require('../middleware/validateProduct');
const asyncHandler = require('express-async-handler');

// 🟢 GET /api/products (with filtering, pagination, and search)
router.get('/', asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 5, search } = req.query;
  const query = {};

  if (category) query.category = category;
  if (search) query.name = new RegExp(search, 'i');

  const products = await Product.find(query)
    .limit(limit)
    .skip((page - 1) * limit);

  const count = await Product.countDocuments(query);
  res.json({ total: count, page, products });
}));

// 🔵 GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}));

// 🟡 POST /api/products
router.post('/', validateProduct, asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
}));

// 🟠 PUT /api/products/:id
router.put('/:id', validateProduct, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}));

// 🔴 DELETE /api/products/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted successfully' });
}));

// 📊 GET /api/products/stats/categories
router.get('/stats/categories', asyncHandler(async (req, res) => {
  const stats = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  res.json(stats);
}));

module.exports = router;
