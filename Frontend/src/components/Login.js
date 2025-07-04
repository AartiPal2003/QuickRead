import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import UserContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [loading, setLoading] = useState(false);

  const { login } = useContext(UserContext); // Access login function from UserContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(''); // Clear previous success message
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;

      login(user, token); // Update user and token in context
      setSuccessMessage('Login successful!'); // Set success message
      setTimeout(() => {
        navigate('/'); // Navigate to home page after successful login
      }, 2000); // Wait for 2 seconds before navigating
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setErrorMessage(message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow-lg rounded" style={{ width: '400px' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Login</h5>

          {/* Success message */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          {/* Error message */}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <div className="input-group">
                <div className="input-group-text"><FaEnvelope /></div>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <div className="input-group-text"><FaLock /></div>
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle input type
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-3">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
