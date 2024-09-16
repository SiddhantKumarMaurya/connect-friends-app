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

        if (user.friends.includes(friendId) || friend.friends.includes(userId)) {
            return res.status(400).json({ msg: 'You are already friends.' });
        }

        // Prevent adding an existing friend
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ msg: 'Friend request already sent.' });
        }

        // Add the friend request to the friend's pending requests
        friend.friendRequests.push(userId);
        await friend.save();

        res.status(200).json({ msg: 'Friend request sent' });
    } catch (err) {
        console.error('Error during friend request:', err);
        res.status(500).json({ msg: 'Server error, please try again.' });
    }
});

// Accept a friend request
router.post('/accept', auth, async (req, res) => {
    const { userId, friendId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ msg: 'Invalid user IDs' });
    }

    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.friendRequests.includes(friendId)) {
            return res.status(400).json({ msg: 'No friend request from this user.' });
        }

        // Add each other as friends
        user.friends.push(friendId);
        friend.friends.push(userId);

        // Remove the friend request
        user.friendRequests = user.friendRequests.filter((id) => id.toString() !== friendId);
        await user.save();
        await friend.save();

        res.status(200).json({ msg: 'Friend request accepted.' });
    } catch (err) {
        console.error('Error accepting friend request:', err);
        res.status(500).json({ msg: 'Server error, please try again.' });
    }
});

// Reject a friend request
router.post('/reject', auth, async (req, res) => {
    const { userId, friendId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ msg: 'Invalid user IDs' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.friendRequests.includes(friendId)) {
            return res.status(400).json({ msg: 'No friend request from this user.' });
        }

        // Remove the friend request
        user.friendRequests = user.friendRequests.filter((id) => id.toString() !== friendId);
        await user.save();

        res.status(200).json({ msg: 'Friend request rejected.' });
    } catch (err) {
        console.error('Error rejecting friend request:', err);
        res.status(500).json({ msg: 'Server error, please try again.' });
    }
});

// Get friend requests for a user
router.get('/:userId/friendRequests', auth, async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(userId).populate('friendRequests', 'username');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ friendRequests: user.friendRequests });
    } catch (err) {
        console.error('Error fetching friend requests:', err);
        res.status(500).json({ msg: 'Server error, please try again.' });
    }
});

module.exports = router;
