const floorService = require('../services/floorService');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' })
    ]
});

// Create a new floor
exports.createFloor = async (req, res) => {
    try {
        const { propertyId, floorNumber } = req.body;
        
        // Basic validation
        if (!propertyId || !floorNumber) {
            return res.status(400).json({ message: 'Property ID and floor number are required' });
        }
        if (isNaN(propertyId) || isNaN(floorNumber)) {
            return res.status(400).json({ message: 'Property ID and floor number must be numbers' });
        }
        if (floorNumber < 0) {
            return res.status(400).json({ message: 'Floor number cannot be negative' });
        }

        const newFloor = await floorService.createFloor(propertyId, floorNumber);
        res.status(201).json(newFloor);
    } catch (error) {
        logger.error(error.message);
        if (error.code === '23503') { // Foreign key violation
            res.status(400).json({ message: 'Property does not exist' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Get all floors for a property
exports.getFloorsByProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;
        
        // Basic validation
        if (!propertyId || isNaN(propertyId)) {
            return res.status(400).json({ message: 'Valid property ID is required' });
        }

        const floors = await floorService.getFloorsByPropertyId(propertyId);
        res.status(200).json(floors);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};