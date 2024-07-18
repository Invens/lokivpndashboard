import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Servers() {
    const [showForm, setShowForm] = useState(false);
    const [servers, setServers] = useState([]);
    const [formData, setFormData] = useState({
        CountryName: '',
        CountryFlag: '',
        IPAddress: '',
        ProtocolType: '',
        Port: '',
        Username: '',
        Password: '',
        OVPNFile: '',
        ServerType: 'Free',
        Status: 'Active',
    });
    const [filter, setFilter] = useState('All');
    const [editingServer, setEditingServer] = useState(null);

    useEffect(() => {
        const fetchServers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://api.lokivpn.com/api/servers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setServers(response.data);
            } catch (error) {
                console.error('Error fetching servers:', error);
            }
        };

        fetchServers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddServer = async () => {
        try {
            const token = localStorage.getItem('token');
            if (editingServer) {
                await axios.put(`https://api.lokivpn.com/api/servers/${editingServer.ServerID}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const updatedServers = servers.map((server) =>
                    server.ServerID === editingServer.ServerID ? { ...formData, ServerID: server.ServerID, CreatedAt: server.CreatedAt, UpdatedAt: new Date().toISOString() } : server
                );
                setServers(updatedServers);
                setEditingServer(null);
            } else {
                const response = await axios.post('https://api.lokivpn.com/api/servers', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setServers([...servers, { ...response.data, CreatedAt: new Date().toISOString(), UpdatedAt: new Date().toISOString(), UsageCount: 0 }]);
            }
            setShowForm(false);
            setFormData({
                CountryName: '',
                CountryFlag: '',
                IPAddress: '',
                ProtocolType: '',
                Port: '',
                Username: '',
                Password: '',
                OVPNFile: '',
                ServerType: 'Free',
                Status: 'Active',
            });
        } catch (error) {
            console.error('Error adding/updating server:', error);
        }
    };

    const handleEditServer = (server) => {
        setFormData(server);
        setShowForm(true);
        setEditingServer(server);
    };

    const handleDeleteServer = async (serverID) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://api.lokivpn.com/api/servers/${serverID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setServers(servers.filter((server) => server.ServerID !== serverID));
        } catch (error) {
            console.error('Error deleting server:', error);
        }
    };

    const handleToggleStatus = async (serverID) => {
        const server = servers.find((s) => s.ServerID === serverID);
        const updatedStatus = server.Status === 'Active' ? 'Inactive' : 'Active';
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`https://api.lokivpn.com/api/servers/${serverID}`, { Status: updatedStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const updatedServers = servers.map((server) =>
                server.ServerID === serverID ? { ...server, Status: updatedStatus } : server
            );
            setServers(updatedServers);
        } catch (error) {
            console.error('Error toggling server status:', error);
        }
    };

    const filteredServers = servers.filter((server) => filter === 'All' || server.ServerType === filter);
    const mostUsedServers = servers.sort((a, b) => b.UsageCount - a.UsageCount).slice(0, 5);

    return (
        <div className='flex'>
            <div className="flex-1 bg-gray-100 p-6 w-[80vw]">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-red-600">Servers</h1>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-semibold text-black">Total Servers</h2>
                        <p className="text-2xl text-green-400 font-bold">{servers.length}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-semibold text-black">Active Servers</h2>
                        <p className="text-2xl text-green-400 font-bold">{servers.filter(s => s.Status === 'Active').length}</p>
                        <p className="text-sm">Today</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-semibold text-black">Deactive Servers</h2>
                        <p className="text-2xl text-green-400 font-bold">{servers.filter(s => s.Status === 'Inactive').length}</p>
                    </div>
                    <div className="col-span-3">
                        <div className="grid grid-cols-2 gap-4 text-black">
                            <div className="bg-white p-6 shadow rounded">
                                <button onClick={() => setShowForm(!showForm)}>Add Server</button>
                                {showForm && (
                                    <div className="mt-4">
                                        <h2 className="text-lg font-bold">Add New Server</h2>
                                        <div>
                                            <label>Country Name</label>
                                            <input type="text" name="CountryName" value={formData.CountryName} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                                        </div>
                                        <div>
                                            <label>Country Flag URL</label>
                                            <input type="text" name="CountryFlag" value={formData.CountryFlag} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                                        </div>
                                        <div>
                                            <label>IP Address</label>
                                            <input type="text" name="IPAddress" value={formData.IPAddress} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                                        </div>
                                        <div>
                                            <label>ProtocolType</label>
                                            <input type="text" name="ProtocolType" value={formData.ProtocolType} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                                        </div>
                                        <div>
                                            <label>Port</label>
                                            <input type="text" name="Port" value={formData.Port} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                                        </div>
                                        <div>
                                            <label>Username</label>
                                            <input type="text" name="Username" value={formData.Username} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                                        </div>
                                        <div>
                                            <label>Password</label>
                                            <input type="text" name="Password" value={formData.Password} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded" />
                                        </div>
                                        <div>
                                            <label>OVPN File</label>
                                            <textarea name="OVPNFile" value={formData.OVPNFile} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded"></textarea>
                                        </div>
                                        <div>
                                            <label>Server Type</label>
                                            <select name="ServerType" value={formData.ServerType} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded">
                                                <option value="Free">Free</option>
                                                <option value="Paid">Paid</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>Status</label>
                                            <select name="Status" value={formData.Status} onChange={handleInputChange} className="block w-full p-2 mt-1 border rounded">
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <button onClick={handleAddServer} className="mt-4 p-2 bg-blue-500 text-white rounded">{editingServer ? 'Update Server' : 'Add Server'}</button>
                                    </div>
                                )}
                            </div>
                            <div className="bg-white p-4 shadow rounded">
                                <h2 className="text-lg font-bold text-black">Most Used Servers</h2>
                                <ul>
                                    {mostUsedServers.map((server) => (
                                        <li key={server.ServerID} className="mt-2">
                                            <p>{server.CountryName} - {server.IPAddress} (Usage: {server.UsageCount})</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <label htmlFor="filter" className="mr-2">Filter by Type:</label>
                    <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
                        <option value="All">All</option>
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
                <table className="w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border p-2 text-black">Country</th>
                            <th className="border p-2 text-black">Flag</th>
                            <th className="border p-2 text-black">IP Address</th>
                            <th className="border p-2 text-black">Username</th>
                            <th className="border p-2 text-black">Password</th>
                            <th className="border p-2 text-black">Server Type</th>
                            <th className="border p-2 text-black">Status</th>
                            <th className="border p-2 text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServers.map((server) => (
                            <tr key={server.ServerID}>
                                <td className="border p-2 text-black">{server.CountryName}</td>
                                <td className="border p-2 text-black">
                                    <img src={server.CountryFlag} alt={server.CountryName} className="w-8 h-8" />
                                </td>
                                <td className="border p-2 text-black">{server.IPAddress}</td>
                                <td className="border p-2 text-black">{server.Username}</td>
                                <td className="border p-2 text-black">{server.Password}</td>
                                <td className="border p-2 text-black">{server.ServerType}</td>
                                <td className="border p-2 text-black">{server.Status}</td>
                                <td className="border p-2 text-black">
                                    <button onClick={() => handleEditServer(server)} className="p-2 bg-yellow-500 text-white rounded mr-2">Edit</button>
                                    <button onClick={() => handleDeleteServer(server.ServerID)} className="p-2 bg-red-500 text-white rounded mr-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Servers;
