// src/pages/CustomerDashboard.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './CustomerDashboard.css';

function CustomerDashboard() {
    const { user, business } = useContext(UserContext);

    if (!user || !business) {
        return <div>Error: User or business information not available</div>;
      }

    return (
        <div className="customer-dashboard">
        <h1>Customer Dashboard : {user.USERNAME} </h1>
        <nav className="navbar">
          <ul>
            <li><NavLink to="/CustomerDash/Reviews">Reviews</NavLink></li>
            <li><NavLink to="/CustomerDash/Search">Search</NavLink></li>
          </ul>
        </nav>
      </div>
    );
}

export default CustomerDashboard;
