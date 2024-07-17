import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'; import './App.css'; 
import Register from './pages/Register';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';

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
                <main className="App-main"> {}
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/CustomerDash" element={<CustomerDashboard />} />
                        <Route path="/ProviderDash" element={<ProviderDashboard />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;