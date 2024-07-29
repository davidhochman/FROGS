import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './context/UserContext'; 
import Register from './pages/Register';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Reviews from './pages/ProviderDashboard/Reviews';
import CustomerReviews from './pages/CustomerDashboard/Reviews';
import Search from './pages/CustomerDashboard/Search';


function App() {
    return (
        <Router>
            <UserProvider>
                <div className="App">
                    <header className="App-header">
                        {/* F.R.O.G.S. Logo */}
                        <div className="logo-container">
                            <h1 className="logo">F.R.O.G.S.</h1>
                            <p className="tagline">Freelancer Reservation Organization Guide and Scheduler</p>
                        </div>
                    </header>
                    <main className="App-main"> { }
                        <Routes>
                            <Route path="/" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/CustomerDash" element={<CustomerDashboard />} />
                            <Route path="/ProviderDash" element={<ProviderDashboard />} />
                            <Route path="/ProviderDash/Reviews" element={<Reviews />} />
                            <Route path="/AdminDash" element={<AdminDashboard />} />
                            <Route path="/CustomerDash/Reviews" element={<CustomerReviews />} />
                            <Route path="/CustomerDash/Search" element={<Search />} />
                        </Routes>
                    </main>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;