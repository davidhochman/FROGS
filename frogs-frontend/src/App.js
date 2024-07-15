import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';import './App.css'; // Import your main App CSS file (if you have one)
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* F.R.O.G.S. Logo */}
          <div className="logo-container">
            <h1 className="logo">F.R.O.G.S.</h1>
            <p className="tagline">Freelancer Reservation Organization Guide and Scheduler</p>
          </div>
        </header>

        <div className="login-section"> {/* Add a new section for login */}
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <p className="login-message">
              If you have an account, please log in. If not, please register for an account below.
            </p>
          </div>

        <main className="App-main"> {/* Add a main content area */}
          <Routes>
            <Route path="/" element={<Register />} />
            {/* ... your other routes ... */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
