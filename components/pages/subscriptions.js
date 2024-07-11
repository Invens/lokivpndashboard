import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Price: '',
    Duration: '',
    Status: 'Active',
  });
  const [filter, setFilter] = useState('All');
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('https://api.lokivpn.com/api/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubscription = async () => {
    try {
      if (editingSubscription) {
        await axios.put(`https://api.lokivpn.com/api/subscriptions/${editingSubscription.SubscriptionTypeID}`, formData);
      } else {
        await axios.post('https://api.lokivpn.com/api/subscriptions', formData);
      }
      fetchSubscriptions();
      setEditingSubscription(null);
      setShowForm(false);
      setFormData({
        Name: '',
        Description: '',
        Price: '',
        Duration: '',
      });
    } catch (error) {
      console.error('Error adding/editing subscription:', error);
    }
  };

  const handleEditSubscription = (subscription) => {
    setFormData(subscription);
    setShowForm(true);
    setEditingSubscription(subscription);
  };

  const handleDeleteSubscription = async (SubscriptionTypeID) => {
    try {
      await axios.delete(`https://api.lokivpn.com/api/subscriptions/${SubscriptionTypeID}`);
      fetchSubscriptions();
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const handleToggleStatus = async (SubscriptionTypeID) => {
    try {
      const subscription = subscriptions.find(sub => sub.SubscriptionTypeID === SubscriptionTypeID);
      const updatedStatus = subscription.Status === 'Active' ? 'Inactive' : 'Active';
      await axios.patch(`https://api.lokivpn.com/api/subscriptions/${SubscriptionTypeID}`, { Status: updatedStatus });
      fetchSubscriptions();
    } catch (error) {
      console.error('Error toggling subscription status:', error);
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) => filter === 'All' || sub.Name === filter);

  return (
    <div className='flex'>
      <div className="flex-1 bg-gray-100 p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-red-600">Subscriptions</h1>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Total Subscriptions</h2>
            <p className="text-2xl text-green-400 font-bold">{subscriptions.length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Basic Users</h2>
            <p className="text-2xl text-green-400 font-bold">{subscriptions.filter(sub => sub.Name === 'Monthly').length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Standard Users</h2>
            <p className="text-2xl text-green-400 font-bold">{subscriptions.filter(sub => sub.Name === 'Yearly Subscription').length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Premium Users</h2>
            <p className="text-2xl text-green-400 font-bold">{subscriptions.filter(sub => sub.Name === '2 year plan').length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <button onClick={() => setShowForm(!showForm)}>Add Subscription</button>
            {showForm && (
              <div className="mt-4">
                <h2 className="text-lg font-bold">{editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}</h2>
                <div>
                  <label>Name</label>
                  <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                </div>
                <div>
                  <label>Description</label>
                  <textarea name="Description" value={formData.Description} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded"></textarea>
                </div>
                <div>
                  <label>Price</label>
                  <input type="number" name="Price" value={formData.Price} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                </div>
                <div>
                  <label>Duration (days)</label>
                  <input type="number" name="Duration" value={formData.Duration} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                </div>
               
                <button onClick={handleAddSubscription} className="mt-4 p-2 bg-blue-500 text-white rounded">{editingSubscription ? 'Update Subscription' : 'Add Subscription'}</button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 bg-white p-4 shadow rounded">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700">Filter by Subscription Type</label>
          <select
            id="filter"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="mt-6 bg-white p-4 shadow rounded">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Subscription ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Duration</th>
               
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.SubscriptionID}>
                  <td className="border px-4 py-2">{sub.SubscriptionTypeID}</td>
                  <td className="border px-4 py-2">{sub.Name}</td>
                  <td className="border px-4 py-2">{sub.Description}</td>
                  <td className="border px-4 py-2">{sub.Price}</td>
                  <td className="border px-4 py-2">{sub.Duration}</td>
                  
                  <td className="border px-4 py-2">
                   
                    <button onClick={() => handleEditSubscription(sub)} className="text-green-500 mr-2">
                      <i className="fas fa-pencil-alt"></i> Edit
                    </button>
                    <button onClick={() => handleDeleteSubscription(sub.SubscriptionTypeID)} className="text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
