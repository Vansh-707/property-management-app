const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');
const winston = require('winston');
const db = require('../config/database');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' })
    ]
});

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const userResult = await db.query(userQuery, [username]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'no user found' });
        }

        const user = userResult.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'incorrect login' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
        const values = [username, password];
        const result = await db.query(query, values);

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        logger.error(error.message);
        if (error.code === '23505') { // Unique constraint violation
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};