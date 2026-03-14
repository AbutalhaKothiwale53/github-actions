import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  BiGroup,
  BiNews,
  BiLike,
  BiHeart,
} from 'react-icons/bi';
import { adminModule } from '../../modules/adminModule';
import '../Admin/Admin.css';

const AdminStats = () => {
  const stats = adminModule.getDashboardStats();

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon />
      </div>
      <div className="stat-info">
        <h6>{label}</h6>
        <h3>{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="admin-stats py-4">
      <Row className="g-4 mb-5">
        <Col md={6} lg={3}>
          <StatCard
            icon={BiGroup}
            label="Total Users"
            value={stats.totalUsers}
            color="users"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={BiNews}
            label="Total Posts"
            value={stats.totalPosts}
            color="posts"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={BiLike}
            label="Total Likes"
            value={stats.totalLikes}
            color="likes"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={BiHeart}
            label="Total Comments"
            value={stats.totalComments}
            color="comments"
          />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card className="summary-card">
            <Card.Header className="summary-header">
              <Card.Title className="mb-0">Platform Summary</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="summary-item">
                <span>Average Posts per User</span>
                <strong>{stats.avgPostsPerUser}</strong>
              </div>
              <div className="summary-item">
                <span>Total Engagements</span>
                <strong>{stats.totalLikes + stats.totalComments}</strong>
              </div>
              <div className="summary-item">
                <span>Avg Engagement per Post</span>
                <strong>
                  {(
                    (stats.totalLikes + stats.totalComments) /
                    (stats.totalPosts || 1)
                  ).toFixed(1)}
                </strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="summary-card">
            <Card.Header className="summary-header">
              <Card.Title className="mb-0">Quick Info</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="summary-item">
                <span>Active Users</span>
                <strong>{stats.totalUsers}</strong>
              </div>
              <div className="summary-item">
                <span>Platform Status</span>
                <strong style={{ color: '#66bb6a' }}>Active</strong>
              </div>
              <div className="summary-item">
                <span>Last Updated</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminStats;
