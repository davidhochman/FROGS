import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';


//data for table
const data = [
  { rating: 1, comment: "Terrible service!", reply: "Too bad loser." },
  { rating: 5, comment: "Best thing ever!", reply: "You're welcome." },
  { rating: 3, comment: "Okay I guess.", reply: "Try harder." },
]

//size of table collums
const styles = {
  table: { width: '100%', tableLayout: 'fixed' },
  ratingColumn: { width: '10%' },
  commentColumn: { width: '45%' },
  replyColumn: { width: '45%' },
};

function Reviews() {
  const { user } = useContext(UserContext); 
  const { business } = useContext(UserContext); 

  console.log("Reviews component rendered"); 


  if (user) {
    return (
      <div>
        <h2>Reviews for {business.name}</h2> {/* Example: Displaying the business name from the context */}
        
        {/* Table */}
        <table style={styles.table}>
          <tr>
            <th style={styles.ratingColumn}>Rating</th>
            <th style={styles.commentColumn}>Comment</th>
            <th style={styles.replyColumn}>Reply</th>
          </tr>
          {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td style={styles.ratingColumn}>{val.rating}</td>
                            <td style={styles.commentColumn}>{val.comment}</td>
                            <td style={styles.replyColumn}>{val.reply}</td>
                        </tr>
                    )
                })}
        </table>
      </div>
    );
  }
  
  return (
    <div>
      <p>Loading... or handle user authentication </p>
    </div>
  )
}

export default Reviews;
