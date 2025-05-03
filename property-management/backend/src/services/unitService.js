const db = require('../config/database');

// Create a new unit
const createUnit = async (floorId, unitNumber) => {
    const query = 'INSERT INTO units (floor_id, unit_number, status) VALUES ($1, $2, $3) RETURNING *';
    const values = [floorId, unitNumber, 'available'];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Get all available units
const getAvailableUnits = async () => {
    const query = `
        SELECT u.*, f.floor_number, p.name as property_name
        FROM units u
        JOIN floors f ON u.floor_id = f.id
        JOIN properties p ON f.property_id = p.id
        WHERE u.status = $1
    `;
    const values = ['available'];
    const result = await db.query(query, values);
    return result.rows;
};

// Book a unit
const bookUnit = async (unitId, userId) => {
    // Start a transaction
    const client = await db.connect();
    
    try {
        await client.query('BEGIN');
        
        // Update unit status
        const updateQuery = 'UPDATE units SET status = $1 WHERE id = $2 RETURNING *';
        const updateValues = ['booked', unitId];
        const unitResult = await client.query(updateQuery, updateValues);
        
        if (unitResult.rows.length === 0) {
            throw new Error('Unit not found');
        }

        // Record booking history
        const historyQuery = 'INSERT INTO booking_history (unit_id, user_id) VALUES ($1, $2)';
        const historyValues = [unitId, userId];
        await client.query(historyQuery, historyValues);

        await client.query('COMMIT');
        return unitResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Fetch booking history
const getBookingHistory = async () => {
    const query = `
        SELECT bh.*, u.unit_number, f.floor_number, p.name as property_name
        FROM booking_history bh
        JOIN units u ON bh.unit_id = u.id
        JOIN floors f ON u.floor_id = f.id
        JOIN properties p ON f.property_id = p.id
        ORDER BY bh.booked_at DESC
    `;
    const result = await db.query(query);
    return result.rows;
};

module.exports = {
    createUnit,
    getAvailableUnits,
    bookUnit,
    getBookingHistory
};