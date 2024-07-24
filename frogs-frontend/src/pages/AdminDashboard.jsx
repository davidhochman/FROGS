import React, { useState } from 'react';
import authService from '../services/auth';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();


    setRegistrationSuccess(null);
    setRegistrationError(null);
    setErrors({ ...errors, general: null });

    try {
      const response = await authService.register(formData);
      console.log('Registration response:', response);

      if (response.success) {
        console.log(response.userID);
        authService.registerbusiness(response.userID);
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
    <div className="register-container"> { }
      <div className="title-container"> {/* Added container for title and message */}
        <h1 className="page-title">Administration Page</h1>
        <p className="admin-message">Create a new admin or business account:</p>
      </div>

      <div className="login-section"> { }
        <Link to="/">
          <button className="login-button">Return to Homepage</button>
        </Link>
        <p className="login-message">
          This is the admin page, create a new admin or business account below.
        </p>
      </div>
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

        <div className="form-group"> { }
          <label htmlFor="userType">User Type:</label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="">Select User Type</option>
            <option value="Admin">Admin</option>
            <option value="Business">Business</option>
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
