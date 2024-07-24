import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';


//data for table
const data = [
  { rating: 1, comment: "Terrible service!", reply: "Too bad loser." },
  { rating: 5, comment: "Best thing ever!", reply: "You're welcome." },
  { rating: 3, comment: "Okay I guess.", reply: "Try harder." },
]


function Reviews() {
  const { user } = useContext(UserContext); 
  const { business } = useContext(UserContext); 

  console.log("Reviews component rendered"); 


  if (user) {
    return (
      <div>
        <h2>Reviews for {business.name}</h2> {/* Example: Displaying the business name from the context */}
        {/* Table */}
        <table>
          <tr>
            <th>Rating</th>
            <th>Comment</th>
            <th>Reply</th>
          </tr>
          {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.rating}</td>
                            <td>{val.comment}</td>
                            <td>{val.reply}</td>
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
