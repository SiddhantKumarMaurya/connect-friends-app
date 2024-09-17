import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    // const [message, setMessage] = useState('');

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
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">Friend Requests</h5>
            {friendRequests.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {(() => {
                        const items = [];
                        for (let i = 0; i < Math.min(4, friendRequests.length); i++) {
                            const request = friendRequests[i];
                            items.push(
                                <li key={request._id} className="py-3 sm:py-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-wrap font-medium text-gray-900 truncate dark:text-white">
                                    {request.username}
                                </p>
                                <div className="inline-flex items-center space-x-2">
                                    <button
                                        onClick={() => handleAccept(request._id)}
                                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDecline(request._id)}
                                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
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
                    {/* {friendRequests.map((request) => (
                        <li key={request._id} className="py-3 sm:py-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {request.username}
                                </p>
                                <div className="inline-flex items-center space-x-2">
                                    <button
                                        onClick={() => handleAccept(request._id)}
                                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDecline(request._id)}
                                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))} */}
                </ul>
            ) : (
                <p className="text-sm font-medium text-gray-900 dark:text-white">No friend requests.</p>
            )}
        </div>
    );
};

export default FriendRequests;
