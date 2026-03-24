import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Button, Modal, Alert } from 'react-bootstrap';
import { BiTrash } from 'react-icons/bi';
import { getAllPosts, deletePost } from '../../modules/adminModule';
import logger from '../../utils/frontendLogger';
import '../Admin/Admin.css';

const AdminPosts = ({ onDataChange }) => {
  const [posts, setPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError('');

    logger.info('Loading all posts for admin');

    const response = await getAllPosts();

    if (response.success) {
      setPosts(response.data || []);
      logger.info('Posts loaded successfully', { count: response.data?.length || 0 });
    } else {
      logger.warn('Failed to load posts', { error: response.error });
      setError(response.error || 'Failed to load posts');
    }

    setLoading(false);
  };

  const handleDeletePost = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    setDeleting(true);
    setError('');

    logger.logUserAction('Admin deleting post', { postId: postToDelete });

    const response = await deletePost(postToDelete);

    if (response.success) {
      logger.info('Post deleted successfully by admin', { postId: postToDelete });
      await loadPosts();
      setShowDeleteModal(false);
      setPostToDelete(null);
      if (onDataChange) onDataChange();
    } else {
      logger.warn('Failed to delete post', { postId: postToDelete, error: response.error });
      setError(response.error || 'Failed to delete post');
    }

    setDeleting(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateContent = (content, maxLength = 50) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  if (loading) {
    return (
      <div className="admin-posts py-4">
        <Alert variant="info">Loading posts...</Alert>
      </div>
    );
  }

  const totalLikes = posts.reduce((sum, p) => sum + (p.likes?.length || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);

  return (
    <div className="admin-posts py-4">
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Card className="admin-card">
        <Card.Header className="card-header-admin">
          <Card.Title className="mb-0">All Posts ({posts.length})</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table hover className="posts-table">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Content</th>
                  <th>Likes</th>
                  <th>Comments</th>
                  <th>Posted On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id || post.id}>
                    <td>
                      <div>
                        <strong>{post.author || 'Unknown'}</strong>
                        <br />
                        <small className="text-muted">{post.authorEmail || 'N/A'}</small>
                      </div>
                    </td>
                    <td>
                      <div className="post-content-cell">
                        {truncateContent(post.content)}
                      </div>
                    </td>
                    <td>
                      <Badge bg="info">{post.likes?.length || 0}</Badge>
                    </td>
                    <td>
                      <Badge bg="warning" text="dark">
                        {post.comments?.length || 0}
                      </Badge>
                    </td>
                    <td className="date-cell">{post.createdAt ? formatDate(post.createdAt) : 'N/A'}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePost(post._id || post.id)}
                        className="delete-btn"
                        disabled={deleting}
                      >
                        <BiTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {posts.length === 0 && (
            <div className="empty-state">
              <p>No posts found</p>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card className="admin-card mt-4">
        <Card.Header className="card-header-admin">
          <Card.Title className="mb-0">Post Statistics</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="summary-grid">
            <div className="summary-box">
              <span>Total Posts</span>
              <h4>{posts.length}</h4>
            </div>
            <div className="summary-box">
              <span>Total Likes</span>
              <h4>{totalLikes}</h4>
            </div>
            <div className="summary-box">
              <span>Total Comments</span>
              <h4>{totalComments}</h4>
            </div>
            <div className="summary-box">
              <span>Avg Engagement</span>
              <h4>
                {posts.length > 0
                  ? ((totalLikes + totalComments) / posts.length).toFixed(1)
                  : '0'}
              </h4>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPosts;
