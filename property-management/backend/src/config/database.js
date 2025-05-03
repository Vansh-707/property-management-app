// Import PostgreSQL client
const { Pool } = require('pg');

// Create database connection
const pool = new Pool({
    user: 'postgres',      // default postgres user
    host: 'localhost',     // localhost
    database: 'property_db', // the database you created
    password: 'password',  // change this to your postgres password
    port: 5432,           // default postgres port
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