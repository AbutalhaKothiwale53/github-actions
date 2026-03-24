import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Tabs, Tab } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';
import AdminStats from './AdminStats';
import AdminUsers from './AdminUsers';
import AdminPosts from './AdminPosts';
import { getCurrentAdmin, logout } from '../../modules/authModule';
import logger from '../../utils/frontendLogger';
import '../Admin/Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = getCurrentAdmin();
  const [activeTab, setActiveTab] = useState('stats');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    logger.logAuthEvent('Admin logging out', { adminId: admin?.id });
    logout();
    logger.info('Admin logged out successfully', { adminId: admin?.id });
    navigate('/admin-login');
  };

  const handleDataChange = () => {
    logger.logUserAction('Admin refreshing dashboard', { adminId: admin?.id });
    setRefreshKey((prev) => prev + 1);
  };

  if (!admin) {
    navigate('/admin-login');
    return null;
  }

  return (
    <div className="admin-dashboard">
      <Navbar className="navbar-admin sticky-top">
        <Container>
          <Navbar.Brand className="brand-admin">Admin Panel</Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <span className="text-white">Welcome, {admin.name}</span>
            <Button
              variant="light"
              size="sm"
              onClick={handleLogout}
              className="logout-btn"
            >
              <BiLogOut /> Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4 admin-container">
        <Tabs
          id="admin-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4 admin-tabs"
        >
          <Tab eventKey="stats" title="Dashboard Stats">
            <AdminStats key={refreshKey} />
          </Tab>
          <Tab eventKey="users" title="Users">
            <AdminUsers key={refreshKey} onDataChange={handleDataChange} />
          </Tab>
          <Tab eventKey="posts" title="All Posts">
            <AdminPosts key={refreshKey} onDataChange={handleDataChange} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default AdminDashboard;
