import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import authService from "../../services/auth";
import { useNavigate } from 'react-router-dom';

//Styles for the search table
const styles = {
  table: { width: '100%', tableLayout: 'fixed', border: '1px solid black' },
  ratingColumn: { width: '10%', border: '1px solid black' },
  commentColumn: { width: '40%', border: '1px solid black' },
  currReply: { width: '40%', border: '1px solid black' },
  replyColumn: { width: '40%', border: '1px solid black' },
  updateColumn: { width: '10%', border: '1px solid black' },
};

function Reviews() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); //Hold search query for filtering
  const navigate = useNavigate();
  const { setBusiness } = useContext(UserContext);
  const { setProfileView } = useContext(UserContext);





  //Function that fetches every business in the database
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        
          const busData = await authService.getbusinesses();
          setBusinesses(busData);
          console.log(busData);
        
      } catch (err) {
        console.error("Error fetching businesses:", err);
        setError(err.message || "An error occurred while fetching businesses."); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []); 

  //Filters the businesses that are shown based on the search query
  useEffect(() => {
    const filtered = businesses.filter(business =>
      business[2].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  }, [businesses, searchQuery]); 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //Navigates user to business profile, sets context for the profile view page
  const handleViewProfile = async (busID, userID) => {
    try {
      const selectedBus = await authService.getbusiness(busID)
      const selectedUser = await authService.getuser(userID)
      setBusiness(selectedBus);
      setProfileView(selectedUser);
      navigate('/CustomerDash/ViewProfile')
    } catch (err) {
      
    }
  };


  //Search input field and businesses table
  return (
    <div>
      <h2>Local Businesses</h2>

      <input 
        type="text" 
        placeholder="Search by business name" 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />

      {loading ? (
        <p>Loading businesses...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p> // Display error message
      ) : (
        <table style={styles.table}>
          <tr>
            {/* Table Headers */}
            <th style={styles.ratingColumn}>Business</th>
            <th style={styles.commentColumn}>Description</th>
            <th style={styles.currReply}>Address</th>
            <th style={styles.updateColumn}></th>
            {/* Table data */}
          </tr> {filteredBusinesses.map((businesses, key) => (
            <tr key={key}>
              <td style={styles.ratingColumn}>{businesses[2]}</td> {/* Display rating directly */}
              <td style={styles.commentColumn}>{businesses[6]}</td>
              <td style={styles.currReply}>{businesses[3]}</td>
              <td style={styles.updateColumn}>
                <button onClick={() => handleViewProfile(businesses[1], businesses[1])}>View Profile</button>
              </td>
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
