import React, { useState } from 'react';

function LoginPage({ onLogin, styles }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check the credentials against the database
    const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
    const user = await response.json();

    if (user.length > 0) {
      onLogin(); // Successful login
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" style={{ ...styles.button, marginTop: '10px' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
