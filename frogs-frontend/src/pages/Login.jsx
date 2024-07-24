import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import UserContext from '../context/UserContext';
import './Register.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { setUser } = useContext(UserContext);
  const { setBusiness } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const user = await authService.login(formData.username, formData.password);
      console.log(user.user.USERTYPE);

      if (user) {

        console.log('Login successful!');
        setSuccessMessage('Login successful!');
        localStorage.setItem('token', user.token);
        setUser(user.user);

        if (user.user.USERTYPE === 'Business') {
          console.log('Navigating to provider dashboard')
          setBusiness(user.business)
          navigate('/ProviderDash');

        } else if (user.user.USERTYPE === 'Customer') {
          console.log('Navigating to customer dashboard')
          navigate('/CustomerDash');
        } else if (user.user.USERTYPE === 'Admin') {
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
