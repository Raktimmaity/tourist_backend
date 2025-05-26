const express = require("express");
const router = express.Router();
const placesController = require("../controllers/placesController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route for getting all places (admin)
router.get("/places", authMiddleware, placesController.getAllPlaces);

// Route for getting places by user (tourist guide)
router.get("/places/:userId", authMiddleware, placesController.getPlacesByUser);

module.exports = router;
