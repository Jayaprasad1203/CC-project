import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Import Login Page

// npx json-server --watch db.json --port 5000

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isRegistered, setIsRegistered] = useState(false); // Track if user is registered
  const [page, setPage] = useState('dashboard'); // Track current page

  const styles = {
    app: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'url(https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg)',
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Light black
      padding: '15px 10px',
      gap: '15px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: 'white',
      color: '#4caf50',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    container: {
      flex: 1,
      padding: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    card: {
      margin: '15px',
      padding: '40px',  // Increased padding
      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      width: '80%',
      maxWidth: '500px',
      border: '2px solid #000',  // Dark border added
    },
    input: {
      margin: '10px 0',
      padding: '12px',
      borderRadius: '5px',
      width: '100%',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
  };
  
  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard styles={styles} />;
      case 'inventory':
        return <Inventory styles={styles} />;
      case 'orders':
        return <Orders styles={styles} />;
      case 'customers':
        return <Customers styles={styles} />;
      default:
        return <Dashboard styles={styles} />;
    }
  };

  if (!isRegistered) {
    return <RegisterPage onRegister={() => setIsRegistered(true)} styles={styles} />;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} styles={styles} />;
  }

  return (
    <div style={styles.app}>
      <div style={styles.navbar}>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
          onClick={() => setPage('dashboard')}
        >
          Dashboard
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
          onClick={() => setPage('inventory')}
        >
          Inventory
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
          onClick={() => setPage('orders')}
        >
          Orders
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
          onClick={() => setPage('customers')}
        >
          Customers
        </button>
      </div>
      <div style={styles.container}>{renderPage()}</div>
    </div>
  );
}



function RegisterPage({ onRegister, styles }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Post the user data to json-server
    const newUser = { name, email, password };

    // Check if the email is already registered
    const response = await fetch('http://localhost:5000/users?email=' + email);
    const existingUsers = await response.json();

    if (existingUsers.length > 0) {
      setError('Email already registered. Please use a different email.');
      return;
    }

    // Register the new user
    await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    onRegister(); // Move to login after successful registration
  };

  // Overriding the app style with a custom background for the register page
  const registerStyles = {
    ...styles.app,
    backgroundImage: 'linear-gradient(to bottom right, black, gray)', // Dual color gradient
  };

  // Additional styling for the heading
  const headingStyle = {
    color: 'white',
    fontSize: '2.5rem',
    margin: '20px 0',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div style={registerStyles}>
      <div style={styles.container}>
        <h1 style={headingStyle}>PHARMACY MANAGEMENT SYSTEM</h1>
        <div style={styles.card}>
          <h2>Register</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}







function Dashboard({ styles }) {
  return (
    <div style={styles.card}>
      <h1>Dashboard</h1>
      <h3>Welcome to the Pharmacy Management System. Navigate through the options to manage inventory, orders, and customers.</h3>
    </div>
  );
}

function Inventory({ styles }) {
  return (
    <div style={styles.card}>
      <h2>Inventory</h2>
      <input style={styles.input} type="text" placeholder="Search Medicines..." />
      <button style={{ ...styles.button, marginTop: '10px' }}>Search</button>
      <ul>
        <li>Paracetamol - 100 units</li>
        <li>Ibuprofen - 200 units</li>
        <li>Aspirin - 150 units</li>
      </ul>
    </div>
  );
}

function Orders({ styles }) {
  return (
    <div style={styles.card}>
      <h2>Orders</h2>
      <input style={styles.input} type="text" placeholder="Enter Order ID..." />
      <button style={{ ...styles.button, marginTop: '10px' }}>Track Order</button>
      <ul>
        <li>Order #1234 - Completed</li>
        <li>Order #5678 - In Progress</li>
      </ul>
    </div>
  );
}

function Customers({ styles }) {
  return (
    <div style={styles.card}>
      <h2>Customers</h2>
      <input style={styles.input} type="text" placeholder="Search Customer..." />
      <button style={{ ...styles.button, marginTop: '10px' }}>Search</button>
      <ul>
        <li>John Doe - Regular Customer</li>
        <li>Jane Smith - New Customer</li>
      </ul>
    </div>
  );
}

export default App;
