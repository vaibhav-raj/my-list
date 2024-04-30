const userModel = require('../models/userSchema');
const { to } = require('await-to-js');

class Auth {
    async checkUserExists(req, res, next) {
        const { userId } = req.params;

        // Find the user by ID
        const [err, user] = await to(userModel.findById(userId));

        if (err) {
            console.error('Error checking user existence:', err);
            return res.status(500).json({ error: 'An error occurred while checking user existence.' });
        }

        // If the user does not exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // If the user exists, attach it to the request object
        req.user = user;
        next();
    }
}

module.exports = Auth
