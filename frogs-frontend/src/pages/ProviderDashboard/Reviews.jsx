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
  const { business } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Get all the reviews for the current business that is logged in 
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (business) {
          const reviewsData = await authService.getreviews(business.BUSID);
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
  }, [business]); // Fetch reviews whenever the business changes

  //Function call that allows the business to update their reply in the review page
  const handleReplySubmit = async (reviewId, newReply) => {
    try {
      console.log(reviewId);
      console.log(newReply);
      if (newReply) {
        await authService.updatereview(reviewId, newReply); // send updated reply to backend

      }
      // Update the review in the local state 
      window.location.reload();
    } catch (err) {
      console.error("Error updating review reply:", err);
      // Handle the error
    }
  };

  return (
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
            <th style={styles.currReply}>Current Response</th>
            <th style={styles.replyColumn}>Update Reply</th>

            {/* Table Data */}
          </tr> {reviews.map((review, key) => (
            <tr key={key}>
              <td style={styles.ratingColumn}>{review.RATING}</td>
              <td style={styles.commentColumn}>{review.REVIEW}</td>
              <td style={styles.currReply}>{review.RESPONSE}</td>
              <td style={styles.replyColumn}>
                <textarea
                  defaultValue={review.REPLY} // Display the current reply in the textarea
                  onChange={(e) => { review.REPLY = e.target.value; }} // Update review.REPLY directly
                  style={{ width: '90%', height: '70px', resize: 'none' }}
                />
                <button onClick={() => handleReplySubmit(review.REVIEWID, review.REPLY)}>Submit Update</button>

              </td>

            </tr>
          ))}
        </table>
      )}
      <button type="button" onClick={() => navigate('/ProviderDash')} className="back-button">
        Back to Dashboard
      </button>
    </div>

  );
}

export default Reviews;
