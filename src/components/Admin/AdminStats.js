import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import {
  BiGroup,
  BiNews,
  BiLike,
  BiHeart,
} from 'react-icons/bi';
import { getDashboardStats } from '../../modules/adminModule';
import logger from '../../utils/frontendLogger';
import '../Admin/Admin.css';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    setError('');

    logger.info('Loading dashboard stats');

    const response = await getDashboardStats();

    if (response.success) {
      setStats(response.data);
      logger.info('Dashboard stats loaded successfully');
    } else {
      logger.warn('Failed to load dashboard stats', { error: response.error });
      setError(response.error || 'Failed to load statistics');
    }

    setLoading(false);
  };

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

  if (loading) {
    return (
      <div className="admin-stats py-4">
        <Alert variant="info">Loading statistics...</Alert>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-stats py-4">
        <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="admin-stats py-4">
        <Alert variant="warning">No statistics available</Alert>
      </div>
    );
  }

  return (
    <div className="admin-stats py-4">
      <Row className="g-4 mb-5">
        <Col md={6} lg={3}>
          <StatCard
            icon={BiGroup}
            label="Total Users"
            value={stats.totalUsers || 0}
            color="users"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={BiNews}
            label="Total Posts"
            value={stats.totalPosts || 0}
            color="posts"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={BiLike}
            label="Total Likes"
            value={stats.totalLikes || 0}
            color="likes"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={BiHeart}
            label="Total Comments"
            value={stats.totalComments || 0}
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
                <strong>{stats.avgPostsPerUser || 0}</strong>
              </div>
              <div className="summary-item">
                <span>Total Engagements</span>
                <strong>{(stats.totalLikes || 0) + (stats.totalComments || 0)}</strong>
              </div>
              <div className="summary-item">
                <span>Avg Engagement per Post</span>
                <strong>
                  {(
                    ((stats.totalLikes || 0) + (stats.totalComments || 0)) /
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
                <strong>{stats.totalUsers || 0}</strong>
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
