import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let valid = true;
    setEmailError('');
    setPasswordError('');

    // Validate email and password
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    }

    if (valid) {
      console.log(`Email: ${email}, Password: ${password}`);
      navigate('/images');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Gym App</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <span className="error-message">{passwordError}</span>}
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
