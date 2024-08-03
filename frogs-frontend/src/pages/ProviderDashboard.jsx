import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './ProviderDashboard.css';
import authService from "../services/auth";


function ProviderDashboard() {
  const { user, business } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [loading, setLoading] = useState(true); // Loading state
  const [metrics, setMetrics] = useState(null); // State to store metrics


  //This function fetches customer info to display relevent data under booked appointments
  const fetchCustomerInfo = async (customerId) => {
    try {
      const customerData = await authService.getuser(customerId);
      return customerData;
    } catch (error) {
      console.error("Error fetching customer info:", error);
      // Handle error
      return null;
    }
  };

  //This function retrieves all business appointments to display on the dashboard
  useEffect(() => {
    const fetchAppointments = async () => {

      try {
        if (business) {

          const appointmentsData = await authService.getapps(business.BUSID);
          console.log("Fetched appointments:", appointmentsData);

          // Fetch customer info for each booked appointment
          const appointmentsWithCustomers = await Promise.all(
            appointmentsData.map(async (appointment) => {
              if (appointment.CUSTOMERID) { // Check if CUSTOMERID exists
                const customerInfo = await fetchCustomerInfo(appointment.CUSTOMERID);
                return { ...appointment, customerInfo }; // Add customer info to appointment
              } else {
                return appointment; // No CUSTOMERID, so no customer info
              }
            })
          );

          setAppointments(appointmentsWithCustomers);

          const metricsData = await authService.getmetrics(business.BUSID);
          console.log(metricsData);
          setMetrics(metricsData); // Update metrics state

        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [business]);

  return (
    <div className="provider-dashboard">

      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><NavLink to="/ProviderDash/EditProfile">Edit Profile</NavLink></li>
          <li><NavLink to="/ProviderDash/CreateBookings">Create Bookings</NavLink></li>
          <li><NavLink to="/ProviderDash/ManageBookings">Manage Bookings</NavLink></li>
          <li><NavLink to="./reviews">Reviews</NavLink></li>
        </ul>
      </nav>
      <Outlet />

      {/* Display user and business information */}
      <div className="profile-header">
        <h2>{business ? business.NAME : "My Provider Profile"}</h2>
        <p>Welcome back, {user?.FULLNAME}</p> 
      </div>

      {/* User Section */}
      <div className="profile-content">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <p><strong>Username:</strong> {user?.USERNAME}</p>
          <p><strong>Email:</strong> {user?.EMAIL}</p>
          <p><strong>Phone:</strong> {user?.PHONENUM}</p>
        </div>

      {/* Business Section */}
        {business && ( 
          <div className="profile-section">
            <h3>Business Information</h3>
            <p><strong>Business Name:</strong> {business.BUSNAME}</p>
            <p><strong>Address:</strong> {business.ADDRESS}</p>
            <p><strong>Profile Description:</strong> {business.PRFDESC}</p>
          </div>
        )}

        {/* Business Metrics Section */}
        {business && metrics && (
          <div className="profile-section">
            <h3>Business Metrics</h3>
            <p><strong>Average Rating:</strong> {metrics.RATINGAVG || "N/A"}</p>
            <p><strong>Total Bookings:</strong> {metrics.BOOKINGAMT || 0}</p>
          </div>
        )}
      </div>

      {/* Appointments Section */}
      <div className="appointments-section">
        <h3> Your Bookings</h3>
        {loading ? (
          <p>Loading bookings...</p> // Display a loading message while fetching
        ) : (
          <ul className="appointment-list">
            {appointments.map((appointment) => (
              <li key={appointment.BOOKINGID} className="appointment-item">
                {/* Basic booking info */}
                <p><strong>Date:</strong> {appointment.APPDATE}</p>
                <p><strong>Start Time:</strong> {appointment.STARTTIME}</p>
                <p><strong>End Time:</strong> {appointment.ENDTIME}</p>
                <p><strong>Price:</strong> ${appointment.PRICE}</p>
                <p><strong>Appointment ID:</strong> {appointment.APPID}</p>
               
                - - - - - - - - - - - - - - - - -
                {/* Customer info for booked appointments */}
                {appointment.customerInfo ? ( // Conditionally render
                  <div>
                    This appointment has been booked
                    <p><strong>Customer Name:</strong> {appointment.customerInfo.FULLNAME}</p>
                    <p><strong>Customer Email:</strong> {appointment.customerInfo.EMAIL}</p>
                    <p><strong>Customer Number:</strong> {appointment.customerInfo.PHONENUM}</p>
                    - - - - - - - - - - - - - - - - -
                    {/* Business info for booked appointments */}
                    <p><strong>Business Name:</strong> {business.BUSNAME}</p>
                    <p><strong>Business Email:</strong> {user.EMAIL}</p>
                    <p><strong>Business Number:</strong> {user.PHONENUM}</p>

                    </div>

                ) : (
                  <p>Appointment has not been booked</p> //CUSTOMERID doesn't exist or info not found
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default ProviderDashboard;
