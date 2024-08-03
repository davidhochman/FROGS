
// src/pages/CustomerDashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import authService from "../services/auth";
import './CustomerDashboard.css';

function CustomerDashboard() {
    const { user, business } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]); // State to store appointments
    const [busName, setBusName] = useState([]); // State to store appointments
    const [loading, setLoading] = useState(true); // Loading state


    const fetchBusInfo = async (busID) => {
      try {
        const busData = await authService.getbusinessbusid(busID); //retrieve the business info
        const busUser = busData.USERID;

        //Save business name
        const busName = busData.BUSNAME;
        setBusName(busName);

        //Get user data of the business using the userID
        const userData = await authService.getuser(busUser);
        return userData;
      } catch (error) {
        console.error("Error fetching business info:", error);
        // Handle error
        return null;
      }
    };

    //function call to delete app
    const deleteAppointment = async (appID) => {
      try {
        await authService.cancelapp(appID);
        window.location.reload();
      } catch (err) {
        
      }
    };
  
    //Get appointment info for the customer dashboard
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          if (user) {
            const appointmentsData = await authService.getuserapps(user.USERID);
            console.log("Fetched appointments:", appointmentsData);
  
            // Fetch customer info for each appointment
            const appointmentsWithCustomers = await Promise.all(
              appointmentsData.map(async (appointment) => {
                if (appointment.BUSID) { // Check if busID exists
                  const businessInfo = await fetchBusInfo(appointment.BUSID);
                  return { ...appointment, businessInfo }; // Add business info to appointment
                } else {
                  return appointment; // No busID, so no customer info
                }
              })
            );
  
            setAppointments(appointmentsWithCustomers);
  
          }
        } catch (err) {
          console.error("Error fetching appointments:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAppointments();
    }, [user]);

    return (
        <div className="customer-dashboard">

        {/* Navigation bar for customer dashboard */}

        <nav className="navbar">
          <ul>
            <li><NavLink to="/CustomerDash/Reviews">Reviews</NavLink></li>
            <li><NavLink to="/CustomerDash/Search">Search</NavLink></li>
            <li><NavLink to="/CustomerDash/EditProfile">Edit Profile</NavLink></li>
          </ul>
        </nav>

        <div className="profile-header">
        <h2>{business ? business.NAME : "My Provider Profile"}</h2>
        <p>Welcome back, {user?.FULLNAME}</p> 
      </div>

      {/* Profile Section */}
      <div className="profile-content">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <p><strong>Username:</strong> {user?.USERNAME}</p>
          <p><strong>Email:</strong> {user?.EMAIL}</p>
          <p><strong>Phone:</strong> {user?.PHONENUM}</p>
        </div>
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

                {/* Booking Info */}
                <p><strong>Date:</strong> {appointment.APPDATE}</p>
                <p><strong>Start Time:</strong> {appointment.STARTTIME}</p>
                <p><strong>End Time:</strong> {appointment.ENDTIME}</p>
                <p><strong>Price:</strong> ${appointment.PRICE}</p>
                <p><strong>Appointment ID:</strong> {appointment.APPID}</p>

                {/* Business details for booking */}
                - - - - - - - - - - - - - - - - -
                {appointment.businessInfo ? ( // 
                  <div>
                    <p><strong>Business Name:</strong> {busName}</p>
                    <p><strong>Business Email:</strong> {appointment.businessInfo.EMAIL}</p>
                    <p><strong>Business Number:</strong> {appointment.businessInfo.PHONENUM}</p>

                    {/* Customer info for booking */}
                    - - - - - - - - - - - - - - - - -
                    <p><strong>Your number:</strong> {user.PHONENUM}</p>
                    <p><strong>Your email:</strong> {user.EMAIL}</p>
                    <p><strong>Your name:</strong> {user.FULLNAME}</p>

                    <button onClick={() => deleteAppointment(appointment.APPID)}>Cancel Appointment</button>

                  </div>
                ) : (
                  <p>No customer information available</p> //CUSTOMERID doesn't exist or info not found
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      </div>
      
    );
}

export default CustomerDashboard;
