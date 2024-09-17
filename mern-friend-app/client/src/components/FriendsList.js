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
        <div className="w-full">
            {/* Heading */}
            <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                Friends List
            </h2>

            {friends.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6">
                    {friends.map(friend => (
                        <div key={friend._id} className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-end px-4 pt-4">
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="./images/profile-picture.jpg" alt="friend" />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{friend.username}</h5>
                                <div className="flex mt-4">
                                    <button onClick={() => handleUnfriend(friend._id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Unfriend
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-700 dark:text-gray-400">No friends added.</p>
            )}
        </div>
    );
};

export default FriendsList;
