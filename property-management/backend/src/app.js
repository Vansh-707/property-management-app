// Import required packages
const express = require('express');
const cors = require('cors');
const propertyRoutes = require('./routes/propertyRoutes');
const floorRoutes = require('./routes/floorRoutes');
const unitRoutes = require('./routes/unitRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/properties', propertyRoutes);
app.use('/floors', floorRoutes);
app.use('/units', unitRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;