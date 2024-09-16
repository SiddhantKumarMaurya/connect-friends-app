import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter users based on the search term
    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <h2>Users</h2>
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredUsers.length > 0 ? (
                <ul>
                    {filteredUsers.map(user => (
                        <li key={user._id}>{user.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UserList;
