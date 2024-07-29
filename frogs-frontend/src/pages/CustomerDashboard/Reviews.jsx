import React, { useContext, useState  } from 'react';
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
  commentColumn: { width: '40%', border: '1px solid black' },
  replyColumn: { width: '40%', border: '1px solid black' },
  updateColumn: { width: '10%', border: '1px solid black' },
};

function Reviews() {
  const { user } = useContext(UserContext);
  const [businessName, setBusinessName] = useState("");
  const [businessReviews, setBusinessReviews] = useState([]);

  
  const handleBusinessNameChange = (event) => {
    setBusinessName(event.target.value);
  };
  /**/


  /*
  const [replies, setReplies] = useState(data.map((item) => item.reply));

  const handleReplyChange = (index, event) => {
    const newReplies = [...replies];
    newReplies[index] = event.target.value;
    setReplies(newReplies);
  };
  */

  console.log("Reviews component rendered");

  const handleReplySubmit = (index) => {
    //console.log(`Reply for item ${index} submitted: ${replies[index]}`);
    // Here, you can add your submission logic, e.g., API call to update the reply in the backend.
  };


  if (user) {
    return (
      <div>
        <h2>Read Reviews for {businessName}</h2>
        {/* Pick the biz */}
        <form style={styles.input}>
          <input
            type="text"
            value={businessName}
            onChange={handleBusinessNameChange}
            placeholder="Enter business name"
          />
        </form>

        {/* Decorative Line */}
        <div>
          <hr style={{ border: '1px solid #000', margin: '20px 0' }} />
        </div>

        {/* Table */}
        <table style={styles.table}>
          <tr>
            <th style={styles.ratingColumn}>Rating</th>
            <th style={styles.commentColumn}>Customer Comment</th>
            <th style={styles.replyColumn}>Business Reply</th>
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
