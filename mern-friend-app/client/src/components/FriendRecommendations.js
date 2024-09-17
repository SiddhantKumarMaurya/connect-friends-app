import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [message, setMessage] = useState('');
    const [sentRequests, setSentRequests] = useState([]); // State to track sent friend requests

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const userId = localStorage.getItem('user-id');

            const res = await axios.get(`http://localhost:5000/api/friend/${userId}/recommendations`, {
                headers: { 'x-auth-token': token },
            });
            setRecommendations(res.data.recommendations);
        } catch (err) {
            console.error('Error fetching recommendations:', err);
            setMessage('An error occurred while fetching friend recommendations.');
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
            setMessage(res.data.msg);

            // Add the friendId to the list of sent requests to disable the button
            setSentRequests([...sentRequests, friendId]);

            fetchRecommendations(); // Refresh recommendations
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data.msg); // Display the error message from the server
            } else {
                console.error('Error during friend request:', err);
                setMessage('An error occurred while sending the friend request.');
            }
        }
    };

    return (
        <>
            {/* Notification Popup */}
            {message && (
                <div className="pop-up-message">
                    {message}
                </div>
            )}

            <div className="recommendations-container">
                <div className="header-container">
                    <h5>Friend Recommendations</h5>
                </div>
                <div className="recommendations">
                    {recommendations.length > 0 ? (
                        <ul>
                            {(()=> {
                                const items = []
                                for (let i = 0; i < Math.min(4, recommendations.length); i++) {
                                    const recommendation = recommendations[i];
                                    items.push(
                                    <li key={i}>
                                        <div className="recommendation">
                                            <div className="person-info">
                                                <p>
                                                    {recommendation.username} <br/> 
                                                    (Mutual Friends: {recommendation.mutualFriends}, Common Interests: {recommendation.commonInterests})
                                                </p>
                                            </div>
                                            <div className="button-container">
                                                <button
                                                    onClick={() => handleAddFriend(recommendation._id)}
                                                    disabled={sentRequests.includes(recommendation._id)} // Disable button if request is sent
                                                    type="button"
                                                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
                                                        sentRequests.includes(recommendation._id)
                                                            ? 'bg-gray-500 cursor-not-allowed'
                                                            : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                                    }`}
                                                >
                                                    {sentRequests.includes(recommendation._id) ? 'Request Sent' : 'Add Friend'}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    )
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
                                            No recommendations available
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

export default FriendRecommendations;
