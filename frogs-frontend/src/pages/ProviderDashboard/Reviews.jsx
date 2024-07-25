import './Reviews.css';
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

function Reviews() {
  const { user } = useContext(UserContext);

  return (
    <div className="reviews">
      <h1>Reviews</h1>
      {user.reviews.map((review, index) => (
        <div key={index} className="review">
          <h2>Review {index + 1}</h2>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;