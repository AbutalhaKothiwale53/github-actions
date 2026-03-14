import { MOCK_USERS } from './authModule';
import { postsModule } from './postsModule';

export const adminModule = {
  // Get total number of users
  getTotalUsers: function () {
    return MOCK_USERS.length;
  },

  // Get all users with their post count
  getUsersWithPostStats: function () {
    return MOCK_USERS.map((user) => {
      const userPosts = postsModule.getUserPosts(user.id);
      const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
      const totalComments = userPosts.reduce((sum, post) => sum + post.comments, 0);

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        postsCount: userPosts.length,
        totalLikes,
        totalComments,
        posts: userPosts,
      };
    });
  },

  // Get total number of posts
  getTotalPosts: function () {
    return postsModule.getAllPosts().length;
  },

  // Get dashboard statistics
  getDashboardStats: function () {
    const allPosts = postsModule.getAllPosts();
    const totalLikes = allPosts.reduce((sum, post) => sum + post.likes, 0);
    const totalComments = allPosts.reduce((sum, post) => sum + post.comments, 0);

    return {
      totalUsers: this.getTotalUsers(),
      totalPosts: allPosts.length,
      totalLikes,
      totalComments,
      avgPostsPerUser: (allPosts.length / this.getTotalUsers()).toFixed(2),
    };
  },

  // Get posts with author details
  getAllPostsWithAuthor: function () {
    return postsModule.getAllPosts().map((post) => {
      const author = MOCK_USERS.find((u) => u.id === post.userId);
      return {
        ...post,
        authorEmail: author?.email || 'Unknown',
      };
    });
  },

  // Delete a post
  deletePost: function (postId) {
    const index = postsModule.posts.findIndex((p) => p.id === postId);
    if (index > -1) {
      postsModule.posts.splice(index, 1);
      return true;
    }
    return false;
  },

  // Get user by ID
  getUserById: function (userId) {
    return MOCK_USERS.find((u) => u.id === userId);
  },

  // Get recent posts
  getRecentPosts: function (limit = 10) {
    return postsModule
      .getAllPosts()
      .slice(0, limit)
      .map((post) => {
        const author = MOCK_USERS.find((u) => u.id === post.userId);
        return {
          ...post,
          authorName: author?.name || 'Unknown',
        };
      });
  },
};
