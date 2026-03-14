import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h1 style={{ fontSize: '80px', color: '#2e7d32', fontWeight: 'bold' }}>404</h1>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Page Not Found</h2>
      <p style={{ color: '#999', marginBottom: '30px', fontSize: '16px' }}>
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 30px',
          backgroundColor: '#66bb6a',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <BiArrowBack /> Go Back
      </button>
    </Container>
  );
};

export default NotFound;
