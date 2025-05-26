// server/models/Tour.js
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  location: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);
