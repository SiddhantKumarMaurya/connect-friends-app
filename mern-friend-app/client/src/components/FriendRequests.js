import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const fetchFriendRequests = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            const res = await axios.get(`http://localhost:5000/api/friend/${userId}/friendRequests`, {
                headers: { 'x-auth-token': token },
            });
            setFriendRequests(res.data.friendRequests);
        } catch (err) {
            console.error('Error fetching friend requests:', err);
            setMessage('An error occurred while fetching friend requests.');
        }
    };

    const handleAccept = async (friendId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            const res = await axios.post(
                'http://localhost:5000/api/friend/accept',
                { userId, friendId },
                { headers: { 'x-auth-token': token } }
            );

            setMessage(res.data.msg);
            fetchFriendRequests(); // Refresh the friend requests
        } catch (err) {
            console.error('Error accepting friend request:', err);
            setMessage('An error occurred while accepting the friend request.');
        }
    };

    const handleReject = async (friendId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            const res = await axios.post(
                'http://localhost:5000/api/friend/reject',
                { userId, friendId },
                { headers: { 'x-auth-token': token } }
            );

            setMessage(res.data.msg);
            fetchFriendRequests(); // Refresh the friend requests
        } catch (err) {
            console.error('Error rejecting friend request:', err);
            setMessage('An error occurred while rejecting the friend request.');
        }
    };

    return (
        <div>
            <h2>Friend Requests</h2>
            {friendRequests.length > 0 ? (
                <ul>
                    {friendRequests.map((friend) => (
                        <li key={friend._id}>
                            {friend.username}
                            <button onClick={() => handleAccept(friend._id)}>Accept</button>
                            <button onClick={() => handleReject(friend._id)}>Reject</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friend requests.</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default FriendRequests;
