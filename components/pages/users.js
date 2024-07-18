"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const subscriptionTypes = {
  1: 'Monthly',
  2: 'Half-Yearly',
  3: 'Yearly'
};

function Users() {
  const [users, setUsers] = useState([]);
  const [subscriptionFilter, setSubscriptionFilter] = useState('All');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.lokivpn.com/api/users/');
        const usersWithSubscriptions = await Promise.all(
          response.data.map(async user => {
            try {
              const subscriptionResponse = await axios.get(`https://api.lokivpn.com/api/users/${user.UserID}/subscription-details`);
              return { ...user, subscriptionDetails: subscriptionResponse.data };
            } catch (error) {
              return { ...user, subscriptionDetails: null }; // Guest user or error fetching subscription details
            }
          })
        );
        setUsers(usersWithSubscriptions);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubscriptionChange = (e) => {
    setSubscriptionFilter(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    subscriptionFilter === 'All' || (user.subscriptionDetails && user.subscriptionDetails.SubscriptionTypeID === parseInt(subscriptionFilter))
  );

  const guestUsersCount = users.filter(user => !user.subscriptionDetails).length; // Users without subscription details are considered guest users
  const subscriptionUsersCount = users.filter(user => user.subscriptionDetails).length;

  return (
    <div className='bg-white'>
      <div className="flex-1 bg-gray-100 p-6 w-[80vw]">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-red-600">Users</h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Total Users</h2>
            <p className="text-2xl text-green-400 font-bold">{users.length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Guest Users</h2>
            <p className="text-2xl text-green-400 font-bold">{guestUsersCount}</p>
            <p className="text-sm">Today</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Subscription Users</h2>
            <p className="text-2xl text-green-400 font-bold">{subscriptionUsersCount}</p>
          </div>
        </div>
        <h2 className="text-2xl text-red-600 font-bold mt-6 mb-4">User List</h2>
        <div className="mb-4">
          <label htmlFor="subscriptionFilter" className="block text-sm font-medium text-gray-700">Filter by Subscription</label>
          <select
            id="subscriptionFilter"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={subscriptionFilter}
            onChange={handleSubscriptionChange}
          >
            <option value="All">All</option>
            <option value="1">Monthly</option>
            <option value="2">Half-Yearly</option>
            <option value="3">Yearly</option>
          </select>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Subscription Type</th>
                <th className="px-4 py-2">Bandwidth Used</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.UserID} className="bg-gray-100">
                  <td className="border px-4 py-2">{user.UserID}</td>
                  <td className="border px-4 py-2">{user.Name}</td>
                  <td className="border px-4 py-2">{user.Email}</td>
                  <td className="border px-4 py-2">{user.subscriptionDetails ? subscriptionTypes[user.subscriptionDetails.SubscriptionTypeID] : 'Guest'}</td>
                  <td className="border px-4 py-2">{user.BandwidthUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
