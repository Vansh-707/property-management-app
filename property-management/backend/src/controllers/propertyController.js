const PropertyService = require('../services/propertyService');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' })
    ]
});

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const { name, address } = req.body;
        
        // Basic validation
        if (!name || !address) {
            return res.status(400).json({ message: 'Name and address are required' });
        }
        if (typeof name !== 'string' || typeof address !== 'string') {
            return res.status(400).json({ message: 'Name and address must be strings' });
        }
        if (name.length < 1 || name.length > 255) {
            return res.status(400).json({ message: 'Name must be between 1 and 255 characters' });
        }
        if (address.length < 1) {
            return res.status(400).json({ message: 'Address cannot be empty' });
        }

        const property = await PropertyService.createProperty({ name, address });
        res.status(201).json(property);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get property details by ID
exports.getPropertyDetails = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Basic validation
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Valid property ID is required' });
        }

        const property = await PropertyService.getPropertyDetails(id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await PropertyService.getAllProperties();
        res.status(200).json(properties);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};