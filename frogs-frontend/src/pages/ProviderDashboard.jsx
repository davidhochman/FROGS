import React, { useState, useContext } from 'react'; 
import { NavLink } from 'react-router-dom'; 
import UserContext from '../context/UserContext';
import './ProviderDashboard.css'; 

function ProviderDashboard() {
  const {user} = useContext(UserContext);
  const {business} = useContext(UserContext);

  return (
    <div className="provider-dashboard">
      <h1>Provider Dashboard : {user.USERNAME} </h1> 
      <nav className="navbar">
        <ul>
          <li><NavLink to="/ProviderDash/EditProfile">Edit Profile</NavLink></li>
          <li><NavLink to="/ProviderDash/CreateBookings">Create Bookings</NavLink></li>
          <li><NavLink to="/ProviderDash/ManageBookings">Manage Bookings</NavLink></li>
          <li><NavLink to="/ProviderDash/Reviews">Reviews</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default ProviderDashboard;
