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
        {/* ... your code to display reviews ... */}
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
