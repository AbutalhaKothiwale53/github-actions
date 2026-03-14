// Mock posts data
export const MOCK_POSTS = [
  {
    id: 1,
    userId: 1,
    author: 'John Doe',
    content:
      'Just finished reading an amazing book! Really changed my perspective on life. Highly recommend to everyone!',
    likes: 12,
    comments: 3,
    createdAt: '2026-03-13T10:30:00',
    userHasLiked: false,
    commentsList: [
      {
        id: 1,
        userId: 2,
        author: 'Jane Smith',
        text: 'Which book? I would love to read it!',
        createdAt: '2026-03-13T11:00:00',
      },
      {
        id: 2,
        userId: 1,
        author: 'John Doe',
        text: "It's 'Atomic Habits' by James Clear. A must read!",
        createdAt: '2026-03-13T11:15:00',
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    author: 'Jane Smith',
    content:
      'Had an amazing day at the beach today! The weather was perfect and the sea was so calm. Nature is therapy.',
    likes: 25,
    comments: 5,
    createdAt: '2026-03-12T14:45:00',
    userHasLiked: false,
    commentsList: [
      {
        id: 3,
        userId: 1,
        author: 'John Doe',
        text: 'Sounds wonderful! Where was this?',
        createdAt: '2026-03-12T15:30:00',
      },
    ],
  },
  {
    id: 3,
    userId: 1,
    author: 'John Doe',
    content:
      'Started learning React and I must say it is amazing! Building web applications has never been easier.',
    likes: 18,
    comments: 4,
    createdAt: '2026-03-11T09:20:00',
    userHasLiked: false,
    commentsList: [],
  },
];

export const postsModule = {
  posts: MOCK_POSTS,

  getAllPosts: function () {
    return this.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getPostById: function (id) {
    return this.posts.find((post) => post.id === id);
  },

  getUserPosts: function (userId) {
    return this.posts
      .filter((post) => post.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  addPost: function (userId, author, content) {
    const newPost = {
      id: Math.max(...this.posts.map((p) => p.id), 0) + 1,
      userId,
      author,
      content,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      userHasLiked: false,
      commentsList: [],
    };
    this.posts.push(newPost);
    return newPost;
  },

  likePost: function (postId, userId) {
    const post = this.getPostById(postId);
    if (post && !post.userHasLiked) {
      post.likes += 1;
      post.userHasLiked = true;
    }
  },

  unlikePost: function (postId) {
    const post = this.getPostById(postId);
    if (post && post.userHasLiked) {
      post.likes -= 1;
      post.userHasLiked = false;
    }
  },

  addComment: function (postId, userId, author, text) {
    const post = this.getPostById(postId);
    if (post) {
      const newComment = {
        id: post.commentsList.length + 1,
        userId,
        author,
        text,
        createdAt: new Date().toISOString(),
      };
      post.commentsList.push(newComment);
      post.comments += 1;
      return newComment;
    }
  },

  getPostComments: function (postId) {
    const post = this.getPostById(postId);
    return post ? post.commentsList : [];
  },
};
