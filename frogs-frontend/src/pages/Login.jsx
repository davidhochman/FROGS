import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import UserContext from '../context/UserContext';
import './Register.css';

function Login() {

  //updates the current username and password for function usage
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  //sets the username and password 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //functions to set the user and business objects from UserContext for usage in dashboard interface
  const { setUser } = useContext(UserContext);
  const { setBusiness } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {

      {/* Function call for login authentication */}
      const user = await authService.login(formData.username, formData.password);
      console.log(user.user.USERTYPE);

      if (user) {

        {/* Successful login, set the user context */}

        console.log('Login successful!');
        setSuccessMessage('Login successful!');
        localStorage.setItem('token', user.token);
        setUser(user.user);

        if (user.user.USERTYPE === 'Business') {

          {/* If the user is a business owner set the business context */}
          {/* Navigate to business dashboard */}
          console.log('Navigating to provider dashboard')
          setBusiness(user.business)
          navigate('/ProviderDash');

        } else if (user.user.USERTYPE === 'Customer') {

          {/* Navigate to customer dashboard */}

          console.log('Navigating to customer dashboard')
          navigate('/CustomerDash');
        } else if (user.user.USERTYPE === 'Admin') {

          {/* Navigate to admin dashboard */}

          navigate('/AdminDash');
        }

      } else {

        setError('Invalid credentials');
      }

    } catch (err) {
      console.error('Error during login:', err);
      setError('Invalid Credentials');
    }
  };

  {/* Login input fields */}
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

    </form>
  );
}

export default Login;
