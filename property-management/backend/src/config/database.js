// Import PostgreSQL client
const { Pool } = require('pg');

// Create database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'property_db',
    password: 'password',
    port: 5432,
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool;