// UserLogin.js - Component for user login functionality with enhanced UI and logging
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { loginUser } from '../../modules/authModule';
import logger from '../../utils/frontendLogger';
import '../Auth/Auth.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    logger.logAuthEvent('User attempting login', { email });

    const response = await loginUser(email, password);

    if (response.success) {
      localStorage.setItem('token', response.data.token); 
      logger.info('User login successful', { email });
      setLoading(false);
      navigate('/home');
    } else {
      logger.warn('User login failed', { email, error: response.error });
      setError(response.error || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container gradient-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="login-card shadow">
          <Card.Body>
            <h2 className="text-center mb-4 text-dark">User Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-success"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="text-dark">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-success"
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

            <div className="text-center mb-4">
              <p className="text-dark">
                Don't have an account?{' '}
                <Link to="/register" className="text-success text-decoration-none fw-bold">
                  Register here
                </Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <p className="text-dark">Are you an admin?</p>
              <Button
                variant="outline-success"
                onClick={() => navigate('/admin-login')}
                className="w-100"
              >
                Admin Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UserLogin;
