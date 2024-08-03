import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './context/UserContext'; 

//Importing the different website pages to add routes
import Register from './pages/Register';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Reviews from './pages/ProviderDashboard/Reviews';
import ManageBookings from './pages/ProviderDashboard/ManageBookings';
import CreateBookings from './pages/ProviderDashboard/CreateBookings';
import EditProfile from './pages/ProviderDashboard/EditProfile';
import CustomerReviews from './pages/CustomerDashboard/Reviews';
import Search from './pages/CustomerDashboard/Search';
import CustomerEditProfile from './pages/CustomerDashboard/EditProfile';
import ViewProfile from './pages/CustomerDashboard/ViewProfile';


function App() {
    return (
        <Router>
            <UserProvider>
                <div className="App">

                    {/* F.R.O.G.S Header, present on all pages*/}
                    <header className="App-header">
                        <div className="logo-container">
                            <h1 className="logo">F.R.O.G.S.</h1>
                            <p className="tagline">Freelancer Reservation Organization Guide and Scheduler</p>
                        </div>
                    </header>

                    {/*Application Routes*/}
                    <main className="App-main"> { }
                        <Routes>
                            <Route path="/" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/CustomerDash" element={<CustomerDashboard />} />
                            <Route path="/CustomerDash/Reviews" element={<CustomerReviews />} />
                            <Route path="/CustomerDash/Search" element={<Search />} />
                            <Route path="/CustomerDash/EditProfile" element={<CustomerEditProfile />} />
                            <Route path="/CustomerDash/ViewProfile" element={<ViewProfile />} />
                            <Route path="/ProviderDash" element={<ProviderDashboard />} />
                            <Route path="/ProviderDash/Reviews" element={<Reviews />} />
                            <Route path="/ProviderDash/CreateBookings" element={<CreateBookings />} />
                            <Route path="/ProviderDash/ManageBookings" element={<ManageBookings />} />
                            <Route path="/ProviderDash/EditProfile" element={<EditProfile />} />
                            <Route path="/AdminDash" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;