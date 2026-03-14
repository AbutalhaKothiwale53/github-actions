import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Button, Modal } from 'react-bootstrap';
import { BiTrash } from 'react-icons/bi';
import { adminModule } from '../../modules/adminModule';
import '../Admin/Admin.css';

const AdminPosts = ({ onDataChange }) => {
  const [posts, setPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const postsData = adminModule.getAllPostsWithAuthor();
    setPosts(postsData);
  };

  const handleDeletePost = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      adminModule.deletePost(postToDelete);
      loadPosts();
      setShowDeleteModal(false);
      setPostToDelete(null);
      onDataChange();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateContent = (content, maxLength = 50) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <div className="admin-posts py-4">
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
                  <tr key={post.id}>
                    <td>
                      <div>
                        <strong>{post.author}</strong>
                        <br />
                        <small className="text-muted">{post.authorEmail}</small>
                      </div>
                    </td>
                    <td>
                      <div className="post-content-cell">
                        {truncateContent(post.content)}
                      </div>
                    </td>
                    <td>
                      <Badge bg="info">{post.likes}</Badge>
                    </td>
                    <td>
                      <Badge bg="warning" text="dark">
                        {post.comments}
                      </Badge>
                    </td>
                    <td className="date-cell">{formatDate(post.createdAt)}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="delete-btn"
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
              <h4>{posts.reduce((sum, p) => sum + p.likes, 0)}</h4>
            </div>
            <div className="summary-box">
              <span>Total Comments</span>
              <h4>{posts.reduce((sum, p) => sum + p.comments, 0)}</h4>
            </div>
            <div className="summary-box">
              <span>Avg Engagement</span>
              <h4>
                {posts.length > 0
                  ? (
                      (posts.reduce((sum, p) => sum + p.likes + p.comments, 0) /
                        posts.length) 
                    ).toFixed(1)
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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPosts;
