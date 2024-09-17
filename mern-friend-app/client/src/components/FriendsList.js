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
        <>
        <div>
            <h2>Friends List</h2>
            {friends.length > 0 ? (
                <ul>
                    {friends.map(friend => (
                        <li key={friend._id}>
                            {/* {friend.username} */}
                            {/* <button onClick={() => handleUnfriend(friend._id)}>Unfriend</button> */}
                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-end px-4 pt-4">
                                    {/* <!-- Dropdown menu -->
                                    <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul className="py-2" aria-labelledby="dropdownButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                        </li>
                                        </ul>
                                    </div> */}
                                </div>
                                <div className="flex flex-col items-center pb-10">
                                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="./images/profile-picture.jpg" alt="friend"/>
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{friend.username}</h5>
                                    {/* <span className="text-sm text-gray-500 dark:text-gray-400">{friend.insterests}</span> */}
                                    <div className="flex mt-4 md:mt-6">
                                        <button onClick={() => handleUnfriend(friend._id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Unfriend</button>
                                        {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Unfriend</a> */}
                                        {/* <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a> */}
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                    ))}
                </ul>
            ) : (
                <p>No friends added.</p>
            )}
        </div>
        



        </>
    );
};

export default FriendsList;
