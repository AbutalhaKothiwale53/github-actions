import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { validateAdminLogin, saveAdminToLocalStorage } from '../../modules/authModule';
import '../Auth/Auth.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const admin = validateAdminLogin(username, password);

      if (admin) {
        saveAdminToLocalStorage(admin);
        setLoading(false);
        navigate('/admin-dashboard');
      } else {
        setError('Invalid admin credentials. Try: admin/admin123');
        setLoading(false);
      }
    }, 500);
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
                <Form.Label className="text-dark">Admin Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-success"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="text-dark">Admin Password</Form.Label>
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

            <div className="text-center mt-3">
              <p className="text-dark">Demo Admin Credentials:</p>
              <small className="text-muted">Username: admin</small>
              <br />
              <small className="text-muted">Password: admin123</small>
            </div>

            <div className="text-center mt-4">
              <p className="text-dark">Are you a user?</p>
              <Button
                variant="outline-success"
                onClick={() => navigate('/login')}
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
