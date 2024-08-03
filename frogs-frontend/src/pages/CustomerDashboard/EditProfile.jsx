import React, { useState, useContext,useEffect } from 'react'; 
import authService from '../../services/auth';
import UserContext from '../../context/UserContext';
import './EditProfile.css';
import { useNavigate } from 'react-router-dom';

function EditProfile() {

  const {user} = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Form data for the profile update
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [updateMessage, setUpdateMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  //Send the form data to the backend to update the existing user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      console.log(formData);
      console.log(user.USERID);
      const response = await authService.updateuser(formData, user.USERID); // Pass updated data and userID to the backend
      console.log('Update response:', response);
      if (response.success) {
        setUpdateMessage('Profile updated successfully!');
        const updateUser = await authService.getuser(user.USERID);

        //update user context to show the updated data on the customer dash
        console.log(updateUser);
        setUser(updateUser);

      } else {
        setErrors(response.errors || { general: 'Update failed' });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setErrors({ general: 'Anunexpected error occurred' });
    }
  };

  // Helper function to render input field with validation
  const renderInputField = (label, name, type = "text", value) => (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={false}
      />
      {errors[name] && <p className="error-message">{errors[name]}</p>}
    </div>
  );

  //input fields 
  return (
    <div className="register-container">
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit} className="register-form">
        {renderInputField("Username", "username")}
        {renderInputField("Email", "email", "email")}
        {renderInputField("Full Name", "fullName")}
        {renderInputField("Phone Number", "phoneNumber", "tel")}
        <button type="submit">Update Profile</button>

        <button type="button" onClick={() => navigate('/CustomerDash')} className="back-button">
          Back to Dashboard
        </button>

        {errors.general && <p className="error-message">{errors.general}</p>}
        {updateMessage && <p className="success-message">{updateMessage}</p>}
      </form>
    </div>
  );
}

export default EditProfile;
