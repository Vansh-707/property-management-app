// propertyService.js

const db = require('../config/database');

// Create a new property
const createProperty = async (propertyData) => {
    const { name, address } = propertyData;
    const query = 'INSERT INTO properties (name, address, created_at) VALUES ($1, $2, NOW()) RETURNING *';
    const values = [name, address];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Get all properties
const getAllProperties = async () => {
    const query = 'SELECT * FROM properties';
    const result = await db.query(query);
    return result.rows;
};

// Get property by ID
const getPropertyById = async (id) => {
    const query = 'SELECT * FROM properties WHERE id = $1';
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById,
};