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
        <>
        {/* <div>
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
        </div> */}
        

<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Notifications</h5>
   </div>
   <div className="flow-root">
    {notifications.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {(()=> {
                const length = notifications.length;
                const items = [];
                for (let i = length - 1; i >= Math.max(length - 5, 0); i--) {
                    const notification = notifications[i];
                    console.log(notification.message)
                    items.push(
                    <li className="py-3 sm:py-4" key={i}>
                        <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {notification.message}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
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

        
        </>
    );
};

export default Notifications;
