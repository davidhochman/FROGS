import React, { useState, useContext,useEffect } from 'react'; 
import authService from '../../services/auth';
import UserContext from '../../context/UserContext';
import './EditProfile.css';
import { useNavigate } from 'react-router-dom';

function EditProfile() {

  const {user} = useContext(UserContext);
  const {business} = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const { setBusiness } = useContext(UserContext);
  const navigate = useNavigate();

  //Form data for profile update values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    businessName: '',
    address: '',
    profileDescription: '',
  });

  const [errors, setErrors] = useState({});
  const [updateMessage, setUpdateMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      console.log(formData);
      console.log(user.USERID);
      console.log(business.BUSID);
      const response = await authService.update(formData, user.USERID, business.BUSID); // Pass updated data and userID to the backend
      console.log('Update response:', response);
      if (response.success) {

        //get the new user objects to update the context
        setUpdateMessage('Profile updated successfully!');
        const updateUser = await authService.getuser(user.USERID);
        const updateBusiness = await authService.getbusiness(user.USERID);

        //update the context objects to dynamically update the dashboard upon profile update
        console.log(updateUser);
        console.log(updateBusiness);
        setUser(updateUser);
        setBusiness(updateBusiness);
        
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

  //Input fields for profile update data
  return (
    <div className="register-container">
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit} className="register-form">
        {renderInputField("Username", "username")}
        {renderInputField("Email", "email", "email")}
        {renderInputField("Full Name", "fullName")}
        {renderInputField("Phone Number", "phoneNumber", "tel")}
        {renderInputField("Business Name", "businessName")}
        {renderInputField("Address", "address")}
        {renderInputField("Profile Description", "profileDescription")}
        <button type="submit">Update Profile</button>

        <button type="button" onClick={() => navigate('/ProviderDash')} className="back-button">
          Back to Dashboard
        </button>

        {errors.general && <p className="error-message">{errors.general}</p>}
        {updateMessage && <p className="success-message">{updateMessage}</p>}
      </form>
    </div>
  );
}

export default EditProfile;
