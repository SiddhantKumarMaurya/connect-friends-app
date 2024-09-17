import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);

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
        }
    };

    const handleAccept = async (friendId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            await axios.post(
                'http://localhost:5000/api/friend/accept',
                { userId, friendId },
                { headers: { 'x-auth-token': token } }
            );

            // Refresh the friend requests
            fetchFriendRequests();
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };

    const handleDecline = async (friendId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            await axios.post(
                'http://localhost:5000/api/friend/reject',
                { userId, friendId },
                { headers: { 'x-auth-token': token } }
            );

            // Refresh the friend requests
            fetchFriendRequests();
        } catch (err) {
            console.error('Error declining friend request:', err);
        }
    };

    return (
        <div className="requests-container ">
            <h5>Friend Requests</h5>
            {friendRequests.length > 0 ? (
                <ul className="">
                    {(() => {
                        const items = [];
                        for (let i = 0; i < Math.min(4, friendRequests.length); i++) {
                            const request = friendRequests[i];
                            items.push(
                                <li key={request._id}>
                                    <div className="request">
                                        <p>
                                            {request.username}
                                        </p>
                                        <div className="response-buttons">
                                            <button
                                                onClick={() => handleAccept(request._id)}
                                                className="accept"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleDecline(request._id)}
                                                className="decline"
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        return items
                    })()}
                </ul>
            ) : (
                <p>No friend requests.</p>
            )}
        </div>
    );
};

export default FriendRequests;
