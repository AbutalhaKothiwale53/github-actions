import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import PostCard from './PostCard';
import { getStories } from '../../modules/postsModule';
import logger from '../../utils/frontendLogger';
import '../Post/PostCard.css';

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    setError('');

    logger.info('Loading stories for feed');

    const response = await getStories();

    if (response.success) {
      setPosts(response.data || []);
      logger.info('Stories loaded successfully', { count: response.data?.length || 0 });
    } else {
      logger.warn('Failed to load stories', { error: response.error });
      setError(response.error || 'Failed to load stories');
      setPosts([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostUpdate = () => {
    loadPosts();
  };

  if (loading) {
    return (
      <div className="feed">
        <div className="text-center py-5">
          <p className="text-muted">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feed">
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id || post.id} post={post} onPostUpdate={handlePostUpdate} />
        ))
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">No posts yet. Start by creating one!</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
