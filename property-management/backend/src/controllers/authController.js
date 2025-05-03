const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

exports.login = async (req, res) => {
    try {
        // This is a simplified login for demonstration
        // In a real app, you would verify credentials against a database
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};