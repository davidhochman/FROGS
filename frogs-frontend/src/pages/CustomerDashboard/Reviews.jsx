import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import authService from "../../services/auth";
import { useNavigate } from 'react-router-dom';

//Styles for the reviews table
const styles = {
  table: { width: '100%', tableLayout: 'fixed', border: '1px solid black' },
  ratingColumn: { width: '10%', border: '1px solid black' },
  commentColumn: { width: '40%', border: '1px solid black' },
  currReply: { width: '40%', border: '1px solid black' },
  replyColumn: { width: '40%', border: '1px solid black' },
  updateColumn: { width: '10%', border: '1px solid black' },
};

function Reviews() {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Fetches the reviews that the user has made 
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (user) {
          const reviewsData = await authService.getuserreviews(user.USERID);
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
  }, [user]); // Fetch reviews whenever the business changes

  //Reviews table 
  return (
    <div>
      <h2>Your Reviews</h2>

      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p> // Display error message
      ) : (
        <table style={styles.table}>
          <tr>
            {/* Table headers */}
            <th style={styles.ratingColumn}>Rating</th>
            <th style={styles.commentColumn}>Comment</th>
            <th style={styles.currReply}>Current Response</th>
            {/* Table data */}
          </tr> {reviews.map((review, key) => (
            <tr key={key}>
              <td style={styles.ratingColumn}>{review.RATING}</td> 
              <td style={styles.commentColumn}>{review.REVIEW}</td>
              <td style={styles.currReply}>{review.RESPONSE}</td>
            </tr>
          ))}
        </table>
      )}
      <button type="button" onClick={() => navigate('/CustomerDash')} className="back-button">
          Back to Dashboard
        </button>
    </div>
    
  );
}

export default Reviews;
