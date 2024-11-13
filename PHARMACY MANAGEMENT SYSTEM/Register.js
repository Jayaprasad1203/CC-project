import React, { useState } from 'react';

function Register({ styles }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, phone }), // Include phone in the request
    });

    if (response.ok) {
      setMessage('Registration successful! Please log in.');
    } else {
      setMessage('Registration failed. Try again.');
    }
  };

  return (
    <div style={styles.card}>
      <h2>REGISTER</h2>
      <form onSubmit={handleRegister}>
        
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="tel" // Input type for phone number
          placeholder="Phone Number" // Placeholder for phone
          value={phone}
          onChange={(e) => setPhone(e.target.value)} // Update state with phone input
          required
        />
        <button type="submit" style={{ ...styles.button, marginTop: '10px' }}>
          Register
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
