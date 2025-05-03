const db = require('../config/database');

// Create a new floor
const createFloor = async (propertyId, floorNumber) => {
    const query = 'INSERT INTO floors (property_id, floor_number, created_at) VALUES ($1, $2, NOW()) RETURNING *';
    const values = [propertyId, floorNumber];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Get all floors for a property
const getFloorsByPropertyId = async (propertyId) => {
    const query = 'SELECT * FROM floors WHERE property_id = $1';
    const values = [propertyId];
    const result = await db.query(query, values);
    return result.rows;
};

// Get a floor by ID
const getFloorById = async (id) => {
    const query = 'SELECT * FROM floors WHERE id = $1';
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    createFloor,
    getFloorsByPropertyId,
    getFloorById,
};