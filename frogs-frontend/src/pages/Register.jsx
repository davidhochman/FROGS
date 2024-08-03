import React, { useState } from 'react';
import authService from '../services/auth';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {

  //Form data for the registration, this data will be sent to the function call
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  });

  //Sets specific errors for incorrect input 
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    email: null,
    general: null,
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(null); 
  const [registrationError, setRegistrationError] = useState(null); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: null }); 
    setFormData({ ...formData, [name]: value });
  };

  //When the user presses the register button... calls the register function and handles the response.
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    setRegistrationSuccess(null);
    setRegistrationError(null);
    setErrors({ ...errors, general: null });

    try {
      const response = await authService.register(formData);
      console.log('Registration response:', response);

      if (response.success) {
        setRegistrationSuccess(response.message); 
      
      } else {
        setRegistrationError(response.message || 'Registration failed'); 
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setRegistrationError('An unexpected error occurred');
    }
  };

  return (

    <div className="register-container"> {}
      <div className="login-section"> {}
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
        <p className="login-message">
          If you have an account, please log in. If not, please register for an account below.
        </p>
      </div>


    {/* Register form*/}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      {errors.username && <p className="error">{errors.username}</p>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <input
        type="email" 
        name="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <input
        type="text" 
        name="fullName" 
        placeholder="Full Name" 
        value={formData.fullName} 
        onChange={handleChange} 
        required 
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />

      <div className="form-group"> {}
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="">Select User Type</option>
          <option value="Customer">Customer</option>
        </select>
      </div>

      <button type="submit">Register</button>

      {/* Display error or success message based on state */}
      {registrationError && <p className="error-message">{registrationError}</p>}
      {registrationSuccess && <p className="success-message">{registrationSuccess}</p>}
    </form>
    </div>
  );
}

export default Register;
