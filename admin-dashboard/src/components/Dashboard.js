import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = ({ totalUsers, totalPosts }) => {
  const { usersCount, postsCount,recentPostsCount } = useContext(AuthContext);
  
  return (
    <div className="pl-2 w-full">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 w-full text-white p-4 rounded-lg shadow">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-3xl">{usersCount}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg">Total Posts</h2>
          <p className="text-3xl">{postsCount}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg">Active Users</h2>
          <p className="text-3xl">{5}</p> {/* Placeholder */}
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg">Posts in Last 24h</h2>
          <p className="text-3xl">{recentPostsCount}</p> {/* Placeholder */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
