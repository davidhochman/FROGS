import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import './ViewProfile.css';
import authService from "../../services/auth";

//Styles for the review section
const styles = {
    table: { width: '100%', tableLayout: 'fixed', border: '1px solid black' },
    ratingColumn: { width: '10%', border: '1px solid black' },
    commentColumn: { width: '40%', border: '1px solid black' },
    currReply: { width: '40%', border: '1px solid black' },
    replyColumn: { width: '40%', border: '1px solid black' },
    updateColumn: { width: '10%', border: '1px solid black' },
};


function ProviderDashboard() {
    const { user, business, profileView } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]); // State to store appointments
    const [loading, setLoading] = useState(true); // Loading state
    const [metrics, setMetrics] = useState(null); // State to store metrics
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [newReviewRating, setNewReviewRating] = useState(0); // State for new rating
    const [newReviewText, setNewReviewText] = useState("");

    const handleReviewChange = (event) => {
        setNewReviewText(event.target.value);
    };

    const handleRatingChange = (event) => {
        setNewReviewRating(parseInt(event.target.value, 10));
    };

    const navigate = useNavigate();


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

    //Books available appointment for the user 
    const handleBookAppointment = async (appID) => {
        try {
            await authService.bookappointment(appID, user.USERID);
            navigate("/CustomerDash")
        } catch (err) {
            console.error("Error booking appointment:", err);
            // Handle any errors
        }
    };

    //Sends the new review data to the backend to be put into the database
    const handleLeaveReview = async () => {
        try {
            await authService.newreview(newReviewText, user.USERID, business.BUSID, newReviewRating);
            navigate('/CustomerDash/Reviews');
        } catch (err) {
            console.error("Error booking appointment:", err);
            // Handle any errors
        }
    };

    //Get all appointments for the business that the customer is looking at
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                if (business) {
                    const appointmentsData = await authService.getapps(business.BUSID); //API call
                    console.log("Fetched appointments:", appointmentsData);

                    // Fetch customer info for each appointment
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
                // Consider setting an error state or displaying an error message
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [business]);

    //Get all reviews for the business that the customer is looking at
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (business) {
                    const reviewsData = await authService.getreviews(business.BUSID); //API call
                    setReviews(reviewsData);
                    console.log(reviewsData);
                }
            } catch (err) {
                console.error("Error fetching reviews:", err);
                setError(err.message || "An error occurred while fetching reviews."); // Set error state
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [business]);

    return (
        <div className="provider-dashboard">

            <Outlet />
            <div className="profile-header">
                <h2>{business ? business.NAME : "My Provider Profile"}</h2>
                <p>Viewing {profileView.FULLNAME}'s Business Profile</p> {/* Optional chaining for safety */}
            </div>

            {/* Display user information */}
            <div className="profile-content">
                <div className="profile-section">
                    <h3>Personal Information</h3>
                    <p><strong>Username:</strong> {profileView?.USERNAME}</p>
                    <p><strong>Email:</strong> {profileView?.EMAIL}</p>
                    <p><strong>Phone:</strong> {profileView?.PHONENUM}</p>
                </div>

                {/* Display business information */}
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

            {/* Available Appointments Section */}
            <div className="appointments-section">
                <h3>Available Appointments</h3>
                {loading ? (
                    <p>Loading bookings...</p> // Display a loading message while fetching
                ) : (
                    <ul className="appointment-list">
                        {appointments
                            .filter(appointment => !appointment.CUSTOMERID) // Filter out appointments with CUSTOMERID to only display available apps
                            .map((appointment) => (
                                <li key={appointment.BOOKINGID} className="appointment-item">

                                    {/* Booking info */}
                                    <p><strong>Date:</strong> {appointment.APPDATE}</p>
                                    <p><strong>Start Time:</strong> {appointment.STARTTIME}</p>
                                    <p><strong>End Time:</strong> {appointment.ENDTIME}</p>
                                    <p><strong>Price:</strong> ${appointment.PRICE}</p>
                                    <p><strong>Appointment ID:</strong> {appointment.APPID}</p>

                                    {/* Book APP button */}
                                    <button onClick={() => handleBookAppointment(appointment.APPID)}>
                                        Book Appointment
                                    </button>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            
            {/* Business Reviews Section */}
            <div>
                <h2>Reviews for {business?.BUSNAME || "Business"}</h2>

                {loading ? (
                    <p>Loading reviews...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>Error: {error}</p> // Display error message
                ) : (
                    <table style={styles.table}>
                        <tr>
                            {/* Table Headers */}
                            <th style={styles.ratingColumn}>Rating</th>
                            <th style={styles.commentColumn}>Comment</th>
                            <th style={styles.currReply}>Response</th>

                            {/* Table Data */}
                        </tr> {reviews.map((review, key) => (
                            <tr key={key}>
                                <td style={styles.ratingColumn}>{review.RATING}</td> {/* Display rating directly */}
                                <td style={styles.commentColumn}>{review.REVIEW}</td>
                                <td style={styles.currReply}>{review.RESPONSE}</td>

                            </tr>
                        ))}
                    </table>
                )}
            </div>

            {/* New Review Input */}
            <div className="new-review-section">
                {/* Rating Selection */}
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select id="rating" value={newReviewRating} onChange={handleRatingChange}>
                        <option value={0}>Select a rating</option>
                        {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>
                </div>

                {/* Rating Message */}
                <textarea
                    value={newReviewText}
                    onChange={handleReviewChange}
                    placeholder="Write your review here..."
                    style={{ width: '90%', height: '70px', resize: 'none' }}
                />
                <button onClick={handleLeaveReview}>Leave Review</button>

            </div>


            <button type="button" onClick={() => navigate('/CustomerDash/Search')} className="back-button">
                Back to Search
            </button>

        </div>
    );
}

export default ProviderDashboard;
