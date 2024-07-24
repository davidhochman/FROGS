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
          <li><NavLink to="/provider-dashboard/edit-profile">Edit Profile</NavLink></li>
          <li><NavLink to="/provider-dashboard/create-bookings">Create Bookings</NavLink></li>
          <li><NavLink to="/provider-dashboard/manage-bookings">Manage Bookings</NavLink></li>
          <li><NavLink to="/provider-dashboard/reviews">Reviews</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default ProviderDashboard;
