import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            const res = await axios.get(`http://localhost:5000/api/friend/${userId}/notifications`, {
                headers: { 'x-auth-token': token },
            });
            setNotifications(res.data.notifications);
        } catch (err) {
            console.error('Error fetching notifications:', err);
        }
    };

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>{notification.message} - {new Date(notification.timestamp).toLocaleString()}</li>
                    ))}
                </ul>
            ) : (
                <p>No notifications.</p>
            )}
        </div>
    );
};

export default Notifications;
