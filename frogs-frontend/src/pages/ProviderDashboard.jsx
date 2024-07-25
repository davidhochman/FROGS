import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './ProviderDashboard.css';

function ProviderDashboard() {
  const { user, business } = useContext(UserContext);

  if (!user || !business) {
    return <div>Error: User or business information not available</div>;
  }

  return (
    <div className="provider-dashboard">
      <h1>Provider Dashboard : {user.USERNAME} </h1>
      <nav className="navbar">
        <ul>
          <li><NavLink to="/provider-dashboard/edit-profile" activeClassName="active">Edit Profile</NavLink></li>
          <li><NavLink to="/provider-dashboard/create-bookings" activeClassName="active">Create Bookings</NavLink></li>
          <li><NavLink to="/provider-dashboard/manage-bookings" activeClassName="active">Manage Bookings</NavLink></li>
          <li><NavLink to="/provider-dashboard/reviews" activeClassName="active">Reviews</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default ProviderDashboard;