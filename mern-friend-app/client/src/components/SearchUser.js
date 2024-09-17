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
        <div className="users-container">
            {/* Notification Popup */}
            {notification && (
                <div className="pop-up-message">
                    {notification}
                </div>
            )}

            <div className="users">
                {/* Heading */}
                <div className="users-heading">
                    <h5>Users</h5>
                </div>

                {/* Search Input */}
                <form>
                    <div>
                        <input
                            type="search"
                            placeholder="Search Users"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            required
                        />
                    </div>
                </form>

                {/* Users List */}
                <div className="users-list">
                    {filteredUsers.length > 0 ? (
                        <ul role="list">
                            {filteredUsers.map(user => (
                                <li key={user._id}>
                                    <div className="user">
                                        <img
                                            src="/images/profile-picture.jpg"
                                            alt={user.username}
                                        />
                                        <p>
                                            {user.username}
                                        </p>
                                        <button
                                            onClick={() => handleAddFriend(user._id)}
                                            disabled={sentRequests.includes(user._id)}
                                            type="button"
                                            className={`button-state-one ${
                                                sentRequests.includes(user._id)
                                                    ? 'button-state-two'
                                                    : 'button-state-three'
                                            }`}
                                        >
                                            {sentRequests.includes(user._id) ? 'Request Sent' : 'Add Friend'}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="">
                            No Users found
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default UserList;
