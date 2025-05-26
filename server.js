// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');   

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
const tourRoutes = require('./routes/tourRoutes');
const toursRoutes = require("./routes/tours");
const userRoutes = require('./routes/userRoutes'); 
// const touristPlaceRoutes = require('./routes/placesRoutes'); // Import the touristPlaceRoutes
const placeRoutes = require('./routes/touristPlaceRoutes');
const bookingRoutes = require("./routes/bookingRoutes");
const statsRoutes = require("./routes/stats");
const contactRoutes = require("./routes/contactRoutes");

app.use('/api/tours', tourRoutes);
app.use('/api/users', userRoutes);
app.use('/api', placeRoutes); // Use the route for tourist places
app.use("/api/bookings", bookingRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/contact", contactRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
