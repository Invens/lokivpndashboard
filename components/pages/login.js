"use client";
import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.lokivpn.com/api/admin/login', { Email, Password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            onLogin(); // Call the onLogin prop to notify the parent component
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
