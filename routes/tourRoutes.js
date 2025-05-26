// server/routes/tourRoutes.js
const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');

// POST /api/tours — Create a new tour
router.post('/', async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/tours — Get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
