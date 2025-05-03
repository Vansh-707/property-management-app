const unitService = require('../services/unitService');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' })
    ]
});

// Create a new unit
exports.createUnit = async (req, res) => {
    try {
        const { floorId, unitNumber } = req.body;
        
        // Basic validation
        if (!floorId || !unitNumber) {
            return res.status(400).json({ message: 'Floor ID and unit number are required' });
        }
        if (isNaN(floorId)) {
            return res.status(400).json({ message: 'Floor ID must be a number' });
        }
        if (typeof unitNumber !== 'string' || unitNumber.length < 1) {
            return res.status(400).json({ message: 'Unit number must be a non-empty string' });
        }

        const unit = await unitService.createUnit(floorId, unitNumber);
        res.status(201).json(unit);
    } catch (error) {
        logger.error(error.message);
        if (error.code === '23503') { // Foreign key violation
            res.status(400).json({ message: 'Floor does not exist' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Get all available units
exports.getAvailableUnits = async (req, res) => {
    try {
        const units = await unitService.getAvailableUnits();
        res.status(200).json(units);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Book a unit
exports.bookUnit = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Basic validation
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Valid unit ID is required' });
        }

        // Get user ID from JWT token (added by auth middleware)
        const userId = req.user.userId;
        const unit = await unitService.bookUnit(id, userId);
        
        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.status(200).json(unit);
    } catch (error) {
        logger.error(error.message);
        if (error.message === 'Unit not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Get unit details
exports.getUnitDetails = async (req, res) => {
    try {
        const unit = await unitService.getUnitDetails(req.params.id);
        res.status(200).json(unit);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get booking history
exports.getBookingHistory = async (req, res) => {
    try {
        const history = await unitService.getBookingHistory();
        res.status(200).json(history);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};