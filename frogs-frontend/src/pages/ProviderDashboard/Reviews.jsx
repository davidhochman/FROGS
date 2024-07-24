import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';

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
          <tr>
            <td>1</td>
            <td>I don't like this</td>
            <td>Too bad!</td>
          </tr>
          <tr>
            <td>3</td>
            <td>This is fine</td>
            <td>Okay loser</td>
          </tr>
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
