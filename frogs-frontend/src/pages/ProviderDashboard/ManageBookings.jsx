import React, { useState, useContext } from "react";
import authService from "../../services/auth";
import UserContext from '../../context/UserContext';
import "./ManageBookings.css"; 
import { useNavigate } from 'react-router-dom';

function ManageBookings() {
  const { business } = useContext(UserContext);
  const navigate = useNavigate();
  
  //Form data to hold update booking values
  const [formData, setFormData] = useState({
    price: '',
    startTime: '',
    endTime: '',
    date: '', 
  });

  const [errors, setErrors] = useState({}); //Store errors
  const [bookingMessage, setUpdateMessage] = useState(null); //Store update response

  //Strict validation for updating booking values
  const validateForm = () => {
    const newErrors = {};
  
    if (formData.price !== "") { // Check if price field has a value
      if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
        newErrors.price = "Price must be a positive number";
      }
    }
  
    if (formData.startTime !== "") { // Check if startTime field has a value
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
      if (!timeRegex.test(formData.startTime)) {
        newErrors.startTime = "Start time must be in the format hh:mm AM/PM";
      }
    }
  
    if (formData.endTime !== "") { // Check if endTime field has a value
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
      if (!timeRegex.test(formData.endTime)) {
        newErrors.endTime = "End time must be in the format hh:mm AM/PM";
      }
    }
  
    if (formData.date !== "") { // Check if date field has a value
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (!dateRegex.test(formData.date)) {
        newErrors.date = "Date must be in the format mm/dd/yyyy";
      }
    }
  
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null }); // Clear the error for the field
  };

  //Handles updating the pre-existing booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) { // Submit only if there are no errors

      try{
        console.log(formData);
        const response = await authService.updatebooking(formData, formData.appID); //call update booking function
        console.log('Update response:', response);
        if (response.success) {
            setUpdateMessage('Booking updated successfully!');
        }
        else{
            setErrors(response.errors || { general: 'Update failed' });
        }
      }
      catch (err){
        console.error('Error updating booking:', err);
        setErrors({ general: 'Anunexpected error occurred' });
      }
    }
  };

  //Handles deleting the pre-existing booking
  const handleDelete = async (e) => {
    e.preventDefault(); 
    try {
      // Fetch booking data using the appID
      const bookingData = formData.appID;
      console.log(bookingData);

      if (bookingData) {
        const response = await authService.deletebooking(formData.appID); 
        if(response.success){
          setUpdateMessage('Booking deleted successfully!');
        }
        else{
          setErrors(response.errors || { general: 'Delete failed' });
        }
      } else {
        setErrors({ general: 'Booking not found' });
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      setErrors({ general: 'An unexpected error occurred' });
    }
  };



  //Input fields 
  return (
    <div className="register-container">
      <h1>Update Bookings</h1>

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
          />
          {errors.date && <p className="error-message">{errors.date}</p>}
        </div>

         {/* APPID Input */}
         <div className="form-group">
          <label htmlFor="appID">APP ID:</label>
          <input
            type="text"
            id="appID"
            name="appID"
            value={formData.appID}
            onChange={handleChange}
            required
          />
          {errors.date && <p className="error-message">{errors.date}</p>}
        </div>

        <button type="submit">Update Booking</button>
        <button type="button" onClick={handleDelete} className="delete-button">Delete Booking</button> 


        <button type="button" onClick={() => navigate('/ProviderDash')} className="back-button">
          Back to Dashboard
        </button>

        {bookingMessage && <p className="success-message">{bookingMessage}</p>}
        {errors.general && <p className="error-message">{errors.general}</p>}
      </form>
    </div>
  );
}

export default ManageBookings;
