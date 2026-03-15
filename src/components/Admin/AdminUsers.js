import React, { useState, useEffect } from 'react';
import { Table, Card, Badge } from 'react-bootstrap';
import { adminModule } from '../../modules/adminModule';
import '../Admin/Admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersData = adminModule.getUsersWithPostStats();
    setUsers(usersData);
  }, []);

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
                  <th>Username</th>
                  <th>Email</th>
                  <th>Posts</th>
                  <th>Total Likes</th>
                  <th>Total Comments</th>
                  <th>Member Since</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="user-name-cell">
                      <strong>{user.name}</strong>
                    </td>
                    <td>
                      <Badge bg="light" text="dark">
                        {user.username}
                      </Badge>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <Badge bg="success">{user.postsCount}</Badge>
                    </td>
                    <td>
                      <span className="likes-badge">{user.totalLikes}</span>
                    </td>
                    <td>
                      <span className="comments-badge">{user.totalComments}</span>
                    </td>
                    <td className="date-cell">
                      {new Date(user.createdAt).toLocaleDateString()}
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
              <h4>{users.reduce((sum, u) => sum + u.postsCount, 0)}</h4>
            </div>
            <div className="summary-box">
              <span>Total User Likes</span>
              <h4>{users.reduce((sum, u) => sum + u.totalLikes, 0)}</h4>
            </div>
            <div className="summary-box">
              <span>Total User Comments</span>
              <h4>{users.reduce((sum, u) => sum + u.totalComments, 0)}</h4>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminUsers;
