import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { BiLike, BiCommentDots, BiSolidLike } from 'react-icons/bi';
import { likeStory, unlikeStory, addCommentToStory, getStoryComments } from '../../modules/postsModule';
import logger from '../../utils/frontendLogger';
import '../Post/PostCard.css';

const PostCard = ({ post, onPostUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userHasLiked = post.likes?.includes(currentUser.id);
  const likeCount = post.likes?.length || 0;
  const commentCount = post.comments?.length || 0;

  const handleLike = async () => {
    setLoading(true);
    setError('');

    try {
      if (userHasLiked) {
        logger.logUserAction('Unliking story', { storyId: post._id });
        const response = await unlikeStory(post._id);
        if (response.success) {
          logger.info('Story unliked successfully', { storyId: post._id });
          onPostUpdate();
        } else {
          logger.warn('Failed to unlike story', { storyId: post._id, error: response.error });
          setError(response.error || 'Failed to unlike story');
        }
      } else {
        logger.logUserAction('Liking story', { storyId: post._id });
        const response = await likeStory(post._id);
        if (response.success) {
          logger.info('Story liked successfully', { storyId: post._id });
          onPostUpdate();
        } else {
          logger.warn('Failed to like story', { storyId: post._id, error: response.error });
          setError(response.error || 'Failed to like story');
        }
      }
    } catch (err) {
      logger.error('Error in like/unlike', { error: err.message });
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError('');

    logger.logUserAction('Adding comment to story', { storyId: post._id });

    const response = await addCommentToStory(post._id, newComment);

    if (response.success) {
      logger.info('Comment added successfully', { storyId: post._id });
      setNewComment('');
      
      // Load updated comments
      const commentsResponse = await getStoryComments(post._id);
      if (commentsResponse.success) {
        setComments(commentsResponse.data || []);
      }
      
      onPostUpdate();
    } else {
      logger.warn('Failed to add comment', { storyId: post._id, error: response.error });
      setError(response.error || 'Failed to add comment');
    }

    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <Card className="post-card shadow-sm mb-4">
      <Card.Body>
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex gap-2 flex-grow-1">
            <div className="post-avatar">{post.author?.charAt(0) || 'U'}</div>
            <div className="flex-grow-1">
              <h6 className="mb-0">{post.author || 'Unknown'}</h6>
              <small className="text-muted">{formatDate(post.createdAt)}</small>
            </div>
          </div>
        </div>

        <p className="post-content">{post.content}</p>

        <div className="post-stats mb-3 pb-3 border-bottom">
          <small className="text-muted">{likeCount} likes • {commentCount} comments</small>
        </div>

        <div className="post-actions d-flex gap-2 mb-3">
          <Button
            variant="light"
            className={`action-btn flex-grow-1 ${userHasLiked ? 'liked' : ''}`}
            onClick={handleLike}
            disabled={loading}
          >
            {userHasLiked ? (
              <>
                <BiSolidLike /> Unlike
              </>
            ) : (
              <>
                <BiLike /> Like
              </>
            )}
          </Button>
          <Button
            variant="light"
            className="action-btn flex-grow-1"
            onClick={() => setShowComments(!showComments)}
            disabled={loading}
          >
            <BiCommentDots /> Comment
          </Button>
        </div>

        {showComments && (
          <div className="comments-section">
            <div className="comments-list mb-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id || comment.id} className="comment mb-2 pb-2">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <small className="text-muted">{formatDate(comment.createdAt)}</small>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                ))
              ) : (
                <small className="text-muted">No comments yet. Be the first one!</small>
              )}
            </div>

            <Form onSubmit={handleAddComment}>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="comment-input"
                  disabled={loading}
                />
                <Button
                  variant="success"
                  type="submit"
                  size="sm"
                  disabled={!newComment.trim() || loading}
                >
                  {loading ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
