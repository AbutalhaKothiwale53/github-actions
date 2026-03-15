import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { postsModule } from '../../modules/postsModule';
import '../User/UserHome.css';

const CreatePost = ({ userId, userName, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      postsModule.addPost(userId, userName, content);
      setContent('');
      setIsExpanded(false);
      onPostCreated();
    }
  };

  return (
    <Card className="create-post-card shadow-sm mb-4">
      <Card.Body>
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
                />
                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="success"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                  >
                    Post
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => {
                      setIsExpanded(false);
                      setContent('');
                    }}
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
