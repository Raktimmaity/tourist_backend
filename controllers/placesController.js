const TouristPlace = require("../models/TouristPlace");
const User = require("../models/User");

// Get all places (for admin)
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await TouristPlace.find().populate("userId", "name email role"); // Populating userId for admin
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch places." });
  }
};

// Get places added by a specific tourist guide (for tourist guides)
exports.getPlacesByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from the request parameters
    const places = await TouristPlace.find({ userId }).populate("userId", "name email role"); // Get places for that user
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch places." });
  }
};
