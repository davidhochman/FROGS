import './EditProfile.css';
import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';

function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.USERNAME);
  const [email, setEmail] = useState(user.Email);
  const [phoneNum, setPhoneNum] = useState(user.PhoneNum);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the user context with the new information
    setUser({ ...user, USERNAME: username, Email: email, PhoneNum: phoneNum });
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Phone Number:
          <input type="tel" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;