import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendsList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            const res = await axios.get(`http://localhost:5000/api/friend/${userId}/friends`, {
                headers: { 'x-auth-token': token },
            });
            setFriends(res.data.friends);
        } catch (err) {
            console.error('Error fetching friends:', err);
        }
    };

    const handleUnfriend = async (friendId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            await axios.post(
                'http://localhost:5000/api/friend/unfriend',
                { userId, friendId },
                { headers: { 'x-auth-token': token } }
            );

            // Update the friends list after unfriending
            setFriends(friends.filter(friend => friend._id !== friendId));
        } catch (err) {
            console.error('Error unfriending user:', err);
        }
    };

    return (
        <div className="friend-list-container">
            {/* Heading */}
            <h2>
                Friends List
            </h2>

            {friends.length > 0 ? (
                <div className="friend-list">
                    {friends.map(friend => (
                        <div key={friend._id} className="friend-outer-container">
                            <div className="friend-container">
                                <img src="./images/profile-picture.jpg" alt="friend" />
                                <h5>{friend.username}</h5>
                                <div>
                                    <button onClick={() => handleUnfriend(friend._id)}>
                                        Unfriend
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No friends added.</p>
            )}
        </div>
    );
};

export default FriendsList;
