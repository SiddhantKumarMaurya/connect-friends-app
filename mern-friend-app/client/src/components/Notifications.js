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
            <div className="notifications-container">
                <div className="header-container">
                    <h5>Notifications</h5>
                </div>
                <div className="notifications-info">
                    {notifications.length > 0 ? (
                        <ul>
                            {(()=> {
                                const length = notifications.length;
                                const items = [];
                                for (let i = length - 1; i >= Math.max(length - 5, 0); i--) {
                                    const notification = notifications[i];
                                    items.push(
                                    <li key={i}>
                                        <div className="message-info">
                                            <div className="message-info-text">
                                                <p>
                                                    {notification.message}
                                                </p>
                                            </div>
                                            <div className="message-info-time">
                                            {new Date(notification.timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                    </li>
                                    );
                                }
                                return items
                            })()}
                        </ul>
                    ) : (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            No notifications
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

export default Notifications;
