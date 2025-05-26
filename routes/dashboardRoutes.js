const express = require('express');
const authenticate = require('../middleware/authenticate');
const User = require('../models/userModel');

const router = express.Router();

// Admin dashboard route
router.get('/admin', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).send('Access denied. Admins only');
    }
    res.send('Admin Dashboard: Welcome');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// User dashboard route
router.get('/user', authenticate, async (req, res) => {
  try {
    res.send('User Dashboard: Welcome');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
