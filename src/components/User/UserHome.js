// UserHome.js - Main user dashboard component with feed and post creation functionality
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';
import Feed from '../Post/Feed';
import CreatePost from './CreatePost';
// import { getCurrentUser, logout } from '../../modules/authModule';
import { getCurrentUser } from '../../utils/authUtils';
import { logout } from '../../utils/authUtils';
import logger from '../../utils/frontendLogger';
import '../User/UserHome.css';

const UserHome = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [refreshFeed, setRefreshFeed] = useState(0);

  const handleLogout = () => {
    logger.logAuthEvent('User logging out', { userId: user?.id });
    logout();
    logger.info('User logged out successfully', { userId: user?.id });
    navigate('/');
  };

  const handlePostCreated = () => {
    logger.logUserAction('Refreshing feed after post creation', { userId: user?.id });
    setRefreshFeed((prev) => prev + 1);
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="user-home">
      <Navbar className="navbar-custom sticky-top">
        <Container>
          <Navbar.Brand className="brand-text">StoryShare</Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <span className="text-white">{user.name}</span>
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

      <Container className="py-5 feed-container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <CreatePost
              userId={user.id}
              userName={user.name}
              onPostCreated={handlePostCreated}
            />
            <Feed key={refreshFeed} userId={user.id} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserHome;
