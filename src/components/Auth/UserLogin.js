import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { validateUserLogin, saveUserToLocalStorage } from '../../modules/authModule';
import '../Auth/Auth.css';

const UserLogin = () => {
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
      const user = validateUserLogin(username, password);

      if (user) {
        saveUserToLocalStorage(user);
        setLoading(false);
        navigate('/home');
      } else {
        setError('Invalid username or password. Try: user1/user2 with password: password123');
        setLoading(false);
      }
    }, 500);
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
                <Form.Label className="text-dark">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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

            <div className="text-center mt-3">
              <p className="text-dark">Demo Credentials:</p>
              <small className="text-muted">Username: user1 or user2</small>
              <br />
              <small className="text-muted">Password: password123</small>
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
