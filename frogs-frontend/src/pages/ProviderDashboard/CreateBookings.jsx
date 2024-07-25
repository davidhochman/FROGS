import './CreateBookings.css';
import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

function CreateBookings() {
  const { user, setUser } = useContext(UserContext);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the user context with the new booking
    const newBooking = { date, time, service };
    setUser({ ...user, bookings: [...user.bookings, newBooking] });
  };

  return (
    <div className="create-bookings">
      <h1>Create Booking</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <label>
          Service:
          <input type="text" value={service} onChange={(e) => setService(e.target.value)} />
        </label>
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}

export default CreateBookings;