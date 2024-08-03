import React, { useState, useContext } from "react";
import authService from "../../services/auth";
import UserContext from '../../context/UserContext';
import "./CreateBookings.css"; 
import { useNavigate } from 'react-router-dom';

function CreateBookings() {
  const { business } = useContext(UserContext);
  const navigate = useNavigate();

  //Form data for booking info 
  const [formData, setFormData] = useState({
    price: '',
    startTime: '',
    endTime: '',
    date: '',
  });

  const [errors, setErrors] = useState({}); // Object to store errors for each field
  const [bookingMessage, setUpdateMessage] = useState(null);

  //Strict validation for booking creation
  const validateForm = () => {
    const newErrors = {};

    // Price validation: must be a number
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    // Start and End Time validation: must be in the format "hh:mm AM/PM"
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    if (!timeRegex.test(formData.startTime)) {
      newErrors.startTime = 'Start time must be in the format hh:mm AM/PM';
    }
    if (!timeRegex.test(formData.endTime)) {
      newErrors.endTime = 'End time must be in the format hh:mm AM/PM';
    }

    // Date validation: must be in the format "mm/dd/yyyy"
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!dateRegex.test(formData.date)) {
      newErrors.date = 'Date must be in the format mm/dd/yyyy';
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null }); // Clear the error for the field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Input is valid so continue
    if (validateForm()) { 
      try {
        console.log(formData);
        const response = await authService.createbooking(formData, business.BUSID); //send data to backend to create booking
        console.log('Update response:', response);
        if (response.success) {
          setUpdateMessage('Profile updated successfully!');
        }
        else {
          setErrors(response.errors || { general: 'Update failed' });
        }
      }
      catch (err) {
        console.error('Error updating profile:', err);
        setErrors({ general: 'Anunexpected error occurred' });
      }
    }
  };

  //Input fields 
  return (
    <div className="register-container">
      <h1>Create Booking</h1>

      <form onSubmit={handleSubmit} className="register-form">
        {/* Price Input */}
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number" 
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>

        {/* Start Time Input */}
        <div className="form-group">
          <label htmlFor="startTime">Start Time (hh:mm AM/PM):</label>
          <input
            type="text"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
          {errors.startTime && <p className="error-message">{errors.startTime}</p>}
        </div>

        {/* End Time Input */}
        <div className="form-group">
          <label htmlFor="endTime">End Time (hh:mm AM/PM):</label>
          <input
            type="text"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
          {errors.endTime && <p className="error-message">{errors.endTime}</p>}
        </div>

        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="date">Date (mm/dd/yyyy):</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {errors.date && <p className="error-message">{errors.date}</p>}
        </div>

        <button type="submit">Create Booking</button>

        <button type="button" onClick={() => navigate('/ProviderDash')} className="back-button">
          Back to Dashboard
        </button>

        {bookingMessage && <p className="success-message">{bookingMessage}</p>}
        {errors.general && <p className="error-message">{errors.general}</p>}
      </form>
    </div>
  );
}

export default CreateBookings;
