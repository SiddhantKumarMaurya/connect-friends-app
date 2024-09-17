import React from 'react';
import SearchUser from './SearchUser';
import FriendRequests from './FriendRequests';
import FriendRecommendations from './FriendRecommendations';
import Notifications from './Notifications';
import FriendsList from './FriendsList';

const Home = () => {
    const userName = localStorage.getItem("username");

    return (
        <div className="home-outer-container">
            <div className="home-container">
                <h2>
                    {userName}'s Dashboard
                </h2>

                {/* Display notifications */}
                <div className="mb-6">
                    <Notifications />
                </div>

                {/* Friends Section */}
                <div className="friend-section">
                    {/* Friends Section */}
                    <div className="friend-section-inner">
                        <FriendsList />
                    </div>
                </div>

                {/* Friend Requests and Recommendations */}
                <div className="friend-requests-and-recommendations">
                    <div className="friend-requests">
                        <FriendRequests />
                    </div>
                    <div className="friend-recommendations">
                        <FriendRecommendations />
                    </div>
                </div>

                {/* Search User Section */}
                <div className="search-user-section">
                    <SearchUser />
                </div>
            </div>
        </div>
    );
};

export default Home;
