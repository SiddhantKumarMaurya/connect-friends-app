import React from 'react';
import SearchUser from './SearchUser';
import FriendRequests from './FriendRequests';
import FriendRecommendations from './FriendRecommendations';
import Notifications from './Notifications'; // Import the Notifications component
// import UserList from './UserList'; // Import UserList component
import FriendsList from './FriendsList'; // Import FriendsList component
// import { useNavigate } from 'react-router-dom';

const Home = () => {
    // const navigate = useNavigate();

    // Logout function to clear localStorage
    // const handleLogout = () => {
    //     localStorage.removeItem('auth-token');
    //     localStorage.removeItem('user-id');
    //     navigate('/login'); // Redirect to login page
    // };

    const userName = localStorage.getItem("username");

    return (
        <div>
            <h2>Welcome to the Home Page, {userName}</h2>
            {/* <button onClick={handleLogout} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Logout
            </button> */}
            {/* <button onClick={handleLogout}>Logout</button> */}
            
             {/* Display notifications */}
            <Notifications />

             {/* Display initial users with search bar */}
             {/* <UserList /> */}

            {/* Display friends list with option to unfriend */}
            <FriendsList />

            <FriendRequests />
            <FriendRecommendations />
            <SearchUser />
            
        </div>
    );
};

export default Home;
