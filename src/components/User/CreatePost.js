// CreatePost.js - Component for creating new posts with enhanced UI and logging
import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { createStory } from '../../modules/postsModule';
import logger from '../../utils/frontendLogger';
import '../User/UserHome.css';

const CreatePost = ({ userId, userName, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || content.trim().length < 5) {
    setError('Story must be at least 5 characters long');
    return;
  }

  if (content.trim().length > 100000) {
    setError('Story cannot exceed 100000 characters');
    return;
  }

  setLoading(true);
  setError('');

  const response = await createStory(content);

    if (response.success) {
      logger.info('Story created successfully', { userId, storyId: response.data._id });
      setContent('');
      setIsExpanded(false);
      onPostCreated();
    } else {
      logger.warn('Failed to create story', { userId, error: response.error });
      setError(response.error || 'Failed to create story. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Card className="create-post-card shadow-sm mb-4">
      <Card.Body>
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        
        <div className="d-flex gap-3">
          <div className="user-avatar">
            <div className="avatar-placeholder">{userName.charAt(0)}</div>
          </div>
          <div className="flex-grow-1">
            {!isExpanded ? (
              <Form.Control
                as="textarea"
                placeholder="Share your story..."
                className="post-input-collapsed"
                onClick={() => setIsExpanded(true)}
                readOnly
              />
            ) : (
              <>
                <Form.Control
                  as="textarea"
                  placeholder="Share your story..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="post-input-expanded"
                  rows={4}
                  disabled={loading}
                />
                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="success"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!content.trim() || loading}
                  >
                    {loading ? 'Posting...' : 'Post'}
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => {
                      setIsExpanded(false);
                      setContent('');
                      setError('');
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
