import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';


//data for table
const data = [
  { rating: 1, comment: "Terrible service!", reply: "Too bad loser." },
  { rating: 5, comment: "Best thing ever!", reply: "You're welcome." },
  { rating: 3, comment: "Okay I guess.", reply: "Try harder." },
]

//table style
const styles = {
  table: { width: '100%', tableLayout: 'fixed', border: '1px solid black'},
  ratingColumn: { width: '10%', border: '1px solid black' },
  commentColumn: { width: '45%', border: '1px solid black' },
  replyColumn: { width: '45%', border: '1px solid black' },
  updateColumn: { width: '10%', border: '1px solid black' },
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
            <th style={styles.updateColumn}>Update</th>
          </tr>
          {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td style={styles.ratingColumn}>{val.rating}</td>
                            <td style={styles.commentColumn}>{val.comment}</td>
                            <td style={styles.replyColumn}>{val.reply}</td>
                            <td style={styles.updateColumn}></td>
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
