import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { BiLike, BiCommentDots, BiSolidLike } from 'react-icons/bi';
import { postsModule } from '../../modules/postsModule';
import '../Post/PostCard.css';

const PostCard = ({ post, onPostUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.commentsList);

  const handleLike = () => {
    if (post.userHasLiked) {
      postsModule.unlikePost(post.id);
    } else {
      postsModule.likePost(post.id);
    }
    onPostUpdate();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      postsModule.addComment(post.id, currentUser.id, currentUser.name, newComment);
      setNewComment('');
      setComments(postsModule.getPostComments(post.id));
      onPostUpdate();
    }
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
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex gap-2 flex-grow-1">
            <div className="post-avatar">{post.author.charAt(0)}</div>
            <div className="flex-grow-1">
              <h6 className="mb-0">{post.author}</h6>
              <small className="text-muted">{formatDate(post.createdAt)}</small>
            </div>
          </div>
        </div>

        <p className="post-content">{post.content}</p>

        <div className="post-stats mb-3 pb-3 border-bottom">
          <small className="text-muted">{post.likes} likes • {post.comments} comments</small>
        </div>

        <div className="post-actions d-flex gap-2 mb-3">
          <Button
            variant="light"
            className={`action-btn flex-grow-1 ${post.userHasLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            {post.userHasLiked ? (
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
          >
            <BiCommentDots /> Comment
          </Button>
        </div>

        {showComments && (
          <div className="comments-section">
            <div className="comments-list mb-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="comment mb-2 pb-2">
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
                />
                <Button
                  variant="success"
                  type="submit"
                  size="sm"
                  disabled={!newComment.trim()}
                >
                  Post
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
