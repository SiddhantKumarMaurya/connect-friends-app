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
            console.log(res.data.recommendations)
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
                { headers: { 'x-auth-token': token }
            });
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
        <div>
            <h2>Friend Recommendations</h2>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((recommendation) => (
                        <li key={recommendation._id}>
                            {recommendation.username} (Mutual Friends: {recommendation.mutualFriends}, Common Interests: {recommendation.commonInterests})
                            <button
                                onClick={() => handleAddFriend(recommendation._id)}
                                disabled={sentRequests.includes(recommendation._id)} // Disable button if request is sent
                            >
                                {sentRequests.includes(recommendation._id) ? 'Request Sent' : 'Add Friend'}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations available.</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default FriendRecommendations;
