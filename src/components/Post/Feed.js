import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { postsModule } from '../../modules/postsModule';
import '../Post/PostCard.css';

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    const allPosts = postsModule.getAllPosts();
    setPosts(allPosts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostUpdate = () => {
    loadPosts();
  };

  return (
    <div className="feed">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onPostUpdate={handlePostUpdate} />
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
