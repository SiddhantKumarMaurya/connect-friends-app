import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sentRequests, setSentRequests] = useState([]); // Track sent friend requests
    const [messages, setMessages] = useState({}); // Track messages for each user
    const [notification, setNotification] = useState(null); // Notification state

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            const res = await axios.get(`http://localhost:5000/api/friend/${userId}/users`, {
                headers: { 'x-auth-token': token },
            });
            setUsers(res.data.users);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const handleAddFriend = async (friendId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            const res = await axios.post(
                'http://localhost:5000/api/friend/request',
                { userId, friendId },
                { headers: { 'x-auth-token': token } }
            );

            // Update state with the response message
            setMessages((prevMessages) => ({
                ...prevMessages,
                [friendId]: res.data.msg,
            }));

            // Add the friendId to the list of sent requests to disable the button
            setSentRequests([...sentRequests, friendId]);

            // Show notification
            showNotification(res.data.msg);
        } catch (err) {
            const errorMsg = err.response && err.response.data ? err.response.data.msg : 'An error occurred.';
            setMessages((prevMessages) => ({
                ...prevMessages,
                [friendId]: errorMsg,
            }));

            // Show notification
            showNotification(errorMsg);
        }
    };

    // Function to show notification
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null); // Hide notification after 3 seconds
        }, 3000);
    };

    // Filter users based on the search term
    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {/* Notification Popup */}
            {notification && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md z-50">
                    {notification}
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Users</h5>
            </div>

            <form className="max-w-md mx-auto">
                <div className="relative">
                    <input
                        type="search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Users"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                </div>
            </form>

            <div className="flow-root">
                {filteredUsers.length > 0 ? (
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map(user => (
                            <li className="py-3 sm:py-4" key={user._id}>
                                <div className="flex items-center">
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {user.username}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <button
                                            onClick={() => handleAddFriend(user._id)}
                                            disabled={sentRequests.includes(user._id)} // Disable button if request is sent
                                            type="button"
                                            className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
                                                sentRequests.includes(user._id)
                                                    ? 'bg-gray-500 cursor-not-allowed'
                                                    : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                            }`}
                                        >
                                            {sentRequests.includes(user._id) ? 'Request Sent' : 'Add Friend'}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        No Users found
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserList;
