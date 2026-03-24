import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Alert } from 'react-bootstrap';
import { getAllUsers } from '../../modules/adminModule';
import logger from '../../utils/frontendLogger';
import '../Admin/Admin.css';

const AdminUsers = ({ onDataChange }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');

    logger.info('Loading all users');

    const response = await getAllUsers();

    if (response.success) {
      setUsers(response.data || []);
      logger.info('Users loaded successfully', { count: response.data?.length || 0 });
    } else {
      logger.warn('Failed to load users', { error: response.error });
      setError(response.error || 'Failed to load users');
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="admin-users py-4">
        <Alert variant="info">Loading users...</Alert>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-users py-4">
        <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>
      </div>
    );
  }

  const totalPosts = users.reduce((sum, u) => sum + (u.postsCount || 0), 0);
  const totalLikes = users.reduce((sum, u) => sum + (u.totalLikes || 0), 0);
  const totalComments = users.reduce((sum, u) => sum + (u.totalComments || 0), 0);

  return (
    <div className="admin-users py-4">
      <Card className="admin-card">
        <Card.Header className="card-header-admin">
          <Card.Title className="mb-0">User Statistics</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table hover className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Posts</th>
                  <th>Total Likes</th>
                  <th>Total Comments</th>
                  <th>Member Since</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id}>
                    <td className="user-name-cell">
                      <strong>{user.name || 'Unknown'}</strong>
                    </td>
                    <td>{user.email || 'N/A'}</td>
                    <td>
                      <Badge bg="success">{user.postsCount || 0}</Badge>
                    </td>
                    <td>
                      <span className="likes-badge">{user.totalLikes || 0}</span>
                    </td>
                    <td>
                      <span className="comments-badge">{user.totalComments || 0}</span>
                    </td>
                    <td className="date-cell">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {users.length === 0 && (
            <div className="empty-state">
              <p>No users found</p>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card className="admin-card mt-4">
        <Card.Header className="card-header-admin">
          <Card.Title className="mb-0">Summary</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="summary-grid">
            <div className="summary-box">
              <span>Total Users</span>
              <h4>{users.length}</h4>
            </div>
            <div className="summary-box">
              <span>Total User Posts</span>
              <h4>{totalPosts}</h4>
            </div>
            <div className="summary-box">
              <span>Total User Likes</span>
              <h4>{totalLikes}</h4>
            </div>
            <div className="summary-box">
              <span>Total User Comments</span>
              <h4>{totalComments}</h4>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminUsers;
