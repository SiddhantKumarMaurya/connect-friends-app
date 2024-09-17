import React from 'react';
import SearchUser from './SearchUser';
import FriendRequests from './FriendRequests';
import FriendRecommendations from './FriendRecommendations';
import Notifications from './Notifications';
import FriendsList from './FriendsList';

const Home = () => {
    const userName = localStorage.getItem("username");

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Welcome, {userName}
                </h2>

                {/* Display notifications */}
                <div className="mb-6">
                    <Notifications />
                </div>

                {/* Friends Section */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Friends List (full width) */}
                    <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <FriendsList />
                    </div>
                </div>

                {/* Friend Requests and Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                    <div className="flex justify-center bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <FriendRequests />
                    </div>
                    <div className="flex justify-center bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <FriendRecommendations />
                    </div>
                </div>

                {/* Search User */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4 w-full">
                    <SearchUser />
                </div>
            </div>
        </div>
    );
};

export default Home;
