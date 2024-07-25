import './ManageBookings.css';
import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';

function ManageBookings() {
  const { user } = useContext(UserContext);

  return (
    <div className="manage-bookings">
      <h1>Manage Bookings</h1>
      {user.bookings.map((booking, index) => (
        <div key={index} className="booking">
          <h2>Booking {index + 1}</h2>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.time}</p>
          <p>Service: {booking.service}</p>
        </div>
      ))}
    </div>
  );
}

export default ManageBookings;