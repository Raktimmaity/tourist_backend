// routes/bookingRoutes.js

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// @route   POST /api/bookings/book
// @desc    Book a tour
// @access  Public (or Private if you want to implement authentication)
router.post("/book", async (req, res) => {
  const { userId, tourId, guideId, bookingTime, location, tourTime, placeName, videoUrl } = req.body;

  try {
    const newBooking = new Booking({
      userId,
      guideId,
      tourId,
      bookingTime,
      location,
      tourTime,
      placeName,
      videoUrl
    });

    const savedBooking = await newBooking.save();
    return res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Booking error:", err.message);
    return res.status(500).json({ error: "Server error while booking the tour" });
  }
});

// @route   POST /api/bookings/book
// @desc    Book a tour
// @access  Public
// router.post("/book", async (req, res) => {
//   const {
//     userId,
//     tourId,
//     guideId,
//     bookingTime,
//     location,
//     tourTime,
//     placeName,
//     videoUrl,
//     paymentStatus,
//     transactionId,
//   } = req.body;

//   // Optional: validate required fields
//   if (
//     !userId ||
//     !tourId ||
//     !guideId ||
//     !bookingTime ||
//     !location ||
//     !tourTime ||
//     !placeName ||
//     !paymentStatus ||
//     !transactionId
//   ) {
//     return res.status(400).json({ error: "Missing required booking or payment information" });
//   }

//   try {
//     const newBooking = new Booking({
//       userId,
//       guideId,
//       tourId,
//       bookingTime,
//       location,
//       tourTime,
//       placeName,
//       videoUrl,
//       paymentStatus,
//       transactionId,
//     });

//     const savedBooking = await newBooking.save();
//     return res.status(201).json(savedBooking);
//   } catch (err) {
//     console.error("Booking error:", err.message);
//     return res.status(500).json({ error: "Server error while booking the tour" });
//   }
// });


// router.post("/api/payment/order", async (req, res) => {
//   const { amount, tourId, userId } = req.body;
//   try {
//     const options = {
//       amount, // in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: "Unable to create order" });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const bookings = await Booking.find(); // You can also use .populate() if you have references
//     res.status(200).json(bookings);
//   } catch (err) {
//     console.error('Error fetching bookings:', err.message);
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
    .populate({
    path: "tourId",
    populate: {
      path: "placeId", // this assumes tour has placeId referencing touristplaces
      model: "TouristPlace",
    },
  })
      .populate('userId', 'name')        // Only bring `name` from User
      .populate('guideId', 'name')       // Same here
      .populate('tourId', 'placename'); // Bring `name` and `location` from TouristPlace
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err.message);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// DELETE /api/bookings/:id
router.delete("/:id", async (req, res) => {
  console.log("DELETE request for ID:", req.params.id);
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Delete booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// routes/bookings.js
router.put("/cancel/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking cancelled successfully", booking: updatedBooking });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking", error: err.message });
  }
});

// Latest bookings for admin (all bookings sorted by createdAt desc)
router.get('/recent', async (req, res) => {
  try {
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10) // adjust limit as needed
      .populate('userId', 'name email') // example to populate user info
      .populate('guideId', 'name email'); // example to populate guide info

    res.json(recentBookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Latest bookings for tour guide
router.get('/recent/tour_guide/:id', async (req, res) => {
  try {
    const guideId = req.params.id;

    const recentBookings = await Booking.find({ tourGuideId: guideId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email');

    res.json(recentBookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Latest bookings for user
router.get('/recent/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const recentBookings = await Booking.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('guideId', 'name email');

    res.json(recentBookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
