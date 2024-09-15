import React, { useState } from 'react';
import axios from 'axios';

const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                setMessage('User not authenticated.');
                return;
            }

            const res = await axios.get(`http://localhost:5000/api/friend/search?username=${searchTerm}`, {
                headers: { 'x-auth-token': token },
            });
            setUsers(res.data);
        } catch (err) {
            console.error('Error during user search:', err);
            setMessage('An error occurred while searching for users.');
        }
    };

    const handleAddFriend = async (friendId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id'); // Ensure user ID is correctly stored

            if (!userId || !token) {
                setMessage('User not authenticated.');
                return;
            }

            const res = await axios.post(
                'http://localhost:5000/api/friend/request',
                { userId, friendId },
                { headers: { 'x-auth-token': token } }
            );

            setMessage(res.data.msg);
        } catch (err) {
            console.error('Error during friend request:', err);
            setMessage('An error occurred while sending the friend request.');
        }
    };

    return (
        <div>
            <h2>Search Users</h2>
            <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {users.length > 0 && (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.username}
                            <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
                        </li>
                    ))}
                </ul>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default SearchUser;
