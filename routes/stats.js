// routes/stats.js
const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const User = require("../models/User");
const Place = require("../models/TouristPlace");

// GET /api/stats
// router.get("/", async (req, res) => {
//   try {
//     const totalBookings = await Booking.countDocuments();
//     const totalUsers = await User.countDocuments();
//     const totalPlaces = await Place.countDocuments();

//     res.json({ totalBookings, totalUsers, totalPlaces });
//   } catch (err) {
//     console.error("Stats error:", err);
//     res.status(500).json({ error: "Failed to fetch stats" });
//   }
// });

// -----------------------------
// 📊 Admin Stats
// -----------------------------
router.get("/admin", async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalPlaces = await Place.countDocuments();

    res.json({ totalBookings, totalUsers, totalPlaces });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -----------------------------
// 📊 Tour Guide Stats
// -----------------------------
router.get("/tour_guide/:id", async (req, res) => {
  const guideId = req.params.id;
  try {
    const guideBookings = await Booking.countDocuments({ tourGuide: guideId });
    const guidePlaces = await Place.countDocuments({ createdBy: guideId });

    res.json({ guideBookings, guidePlaces });
  } catch (error) {
    console.error("Error fetching guide stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -----------------------------
// 📊 User Stats
// -----------------------------
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userBookings = await Booking.countDocuments({ user: userId });
    const availablePlaces = await Place.countDocuments(); // all public places

    res.json({ userBookings, availablePlaces });
  } catch (error){
    console.log("Error fetching user stats:", error);
    res.status(500).json({message: "Internal server error"});
  }
});



// Admin stats
router.get('/admin', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalPlaces = await TouristPlace.countDocuments();

    res.json({ totalUsers, totalBookings, totalPlaces });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Tour guide stats
router.get('/tour_guide/:id', async (req, res) => {
  try {
    const guideId = req.params.id;

    const guideBookings = await Booking.countDocuments({ tourGuideId: guideId });
    const guidePlaces = await TouristPlace.countDocuments({ tourGuideId: guideId });

    res.json({ guideBookings, guidePlaces });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// User stats
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const userBookings = await Booking.countDocuments({ userId });
    const availablePlaces = await TouristPlace.countDocuments();

    res.json({ userBookings, availablePlaces });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
