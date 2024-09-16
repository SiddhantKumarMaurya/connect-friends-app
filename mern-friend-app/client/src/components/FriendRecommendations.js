import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [message, setMessage] = useState('');

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
                { headers: { 'x-auth-token': token }
            });
            setMessage(res.data.msg);
            fetchRecommendations(); // Refresh recommendations
        } catch (err) {
            console.error('Error during friend request:', err);
            setMessage('An error occurred while sending the friend request.');
        }
    };

    return (
        <div>
            <h2>Friend Recommendations</h2>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((recommendation) => (
                        <li key={recommendation._id}>
                            {recommendation.username} (Mutual Friends: {recommendation.count})
                            <button onClick={() => handleAddFriend(recommendation._id)}>Add Friend</button>
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
