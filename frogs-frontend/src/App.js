// Example from App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import ProviderDashboard from './pages/ProviderDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        You sucessfully loaded the project!
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                    <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
