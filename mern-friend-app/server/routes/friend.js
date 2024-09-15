const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const router = express.Router();

// Search for users
router.get('/search', auth, async (req, res) => {
    const { username } = req.query;

    try {
        const users = await User.find({ username: { $regex: username, $options: 'i' } }).select('username');
        res.json(users);
    } catch (err) {
        console.error('Error during user search:', err);
        res.status(500).json({ msg: 'Server error, please try again.' });
    }
});

// Send a friend request
router.post('/request', auth, async (req, res) => {
    const { userId, friendId } = req.body;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ msg: 'Invalid user IDs' });
    }

    try {
        // Prevent users from friending themselves
        if (userId === friendId) {
            return res.status(400).json({ msg: 'You cannot add yourself as a friend.' });
        }

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Prevent adding an existing friend
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ msg: 'Already friends' });
        }

        user.friends.push(friendId);
        await user.save();

        res.status(200).json({ msg: 'Friend request sent' });
    } catch (err) {
        console.error('Error during friend request:', err);
        res.status(500).json({ msg: 'Server error, please try again.' });
    }
});

module.exports = router;
