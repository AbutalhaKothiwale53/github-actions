import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { loginAdmin } from '../../modules/authModule';
import logger from '../../utils/frontendLogger';
import '../Auth/Auth.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    logger.logAuthEvent('Admin attempting login', { email });

    const response = await loginAdmin(email, password);

    if (response.success) {
      logger.info('Admin login successful', { email });
      setLoading(false);
      navigate('/admin-dashboard');
    } else {
      logger.warn('Admin login failed', { email, error: response.error });
      setError(response.error || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container gradient-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="login-card shadow">
          <Card.Body>
            <h2 className="text-center mb-4 text-dark">Admin Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter admin email"
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
                  placeholder="Enter admin password"
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
                {loading ? 'Logging in...' : 'Admin Login'}
              </Button>
            </Form>

            <div className="text-center mt-4">
              <p className="text-dark">Are you a user?</p>
              <Button
                variant="outline-success"
                onClick={() => navigate('/')}
                className="w-100"
              >
                User Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminLogin;
