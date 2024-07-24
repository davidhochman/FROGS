import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './context/UserContext'; // Import the UserProvider
import Register from './pages/Register';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EditProfile from './pages/ProviderDashboard/EditProfile';
import CreateBookings from './pages/ProviderDashboard/CreateBookings';
import ManageBookings from './pages/ProviderDashboard/ManageBookings';
import Reviews from './pages/ProviderDashboard/Reviews';


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

                            <Route path="/ProviderDash" element={<ProviderDashboard />} >
                                <Route path="edit-profile" element={<EditProfile />} />
                                <Route path="create-bookings" element={<CreateBookings />} />
                                <Route path="manage-bookings" element={<ManageBookings />} />
                                <Route path="reviews" element={<Reviews />} />
                                /</Route>

                            <Route path="/AdminDash" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;