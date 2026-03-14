# StoryShare - Story Sharing Application

A beautiful, modern web application where users can share written stories (text-based), like posts, and comment on stories. Includes a comprehensive admin dashboard for monitoring users and posts.

## 🎨 Design Features

- **Color Scheme**: White background with light green accents (#2e7d32, #66bb6a)
- **Framework**: React with Bootstrap 5
- **Icons**: React Icons for elegant UI elements
- **Routing**: React Router v7 for seamless navigation

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── UserLogin.js          # User login form
│   │   ├── AdminLogin.js         # Admin login form
│   │   └── Auth.css              # Login page styles
│   ├── User/
│   │   ├── UserHome.js           # Main user home/feed page
│   │   ├── CreatePost.js         # Story creation form
│   │   └── UserHome.css          # User home styles
│   ├── Post/
│   │   ├── PostCard.js           # Individual post card component
│   │   ├── Feed.js               # Feed container for all posts
│   │   └── PostCard.css          # Post and feed styles
│   ├── Admin/
│   │   ├── AdminDashboard.js     # Main admin panel
│   │   ├── AdminStats.js         # Dashboard statistics
│   │   ├── AdminUsers.js         # Users management table
│   │   ├── AdminPosts.js         # Posts management and moderation
│   │   └── Admin.css             # Admin panel styles
│   ├── Comments/                 # Comments components (ready for expansion)
│   └── NotFound.js               # 404 page
├── modules/
│   ├── authModule.js             # Authentication logic & mock users
│   ├── postsModule.js            # Posts CRUD operations
│   └── adminModule.js            # Admin-specific operations
├── utils/
│   └── ProtectedRoute.js         # Route protection wrapper
├── App.js                         # Main app with routing
└── index.css                      # Global theme and Bootstrap import
```

## 🚀 Features

### User Features
- ✅ User login with demo credentials
- ✅ Create text-based stories (posts)
- ✅ View feed with all stories
- ✅ Like/Unlike posts
- ✅ Comment on stories
- ✅ View comment threads
- ✅ User profile with name display
- ✅ Logout functionality

### Admin Features
- ✅ Separate admin login
- ✅ Dashboard with platform statistics
  - Total users
  - Total posts
  - Total likes
  - Total comments
  - Average engagement metrics
- ✅ User management
  - View all users with their stats
  - Posts count per user
  - Total likes/comments per user
  - Member registration date
- ✅ Post management
  - View all posts with authors
  - Delete inappropriate posts
  - Post statistics and engagement metrics
  - Recent posts view
- ✅ Real-time statistics

## 🔐 Authentication

### User Demo Credentials
- **Username**: `user1` or `user2`
- **Password**: `password123`

### Admin Demo Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 🛠️ Installation & Setup

1. **Install Dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📋 Data Storage

Currently, the application uses **mock data stored in JavaScript modules** and **localStorage**:

- **Authentication**: Mock users stored in `authModule.js`
- **Posts**: Mock posts and post operations in `postsModule.js`
- **Session**: User login state stored in browser localStorage
- **Admin Stats**: Calculated from mock data in `adminModule.js`

**Note**: All data is reset on page refresh. For production, replace mock data with real API calls.

## 🎯 How to Use

### For Users

1. **Login**: Navigate to `/login` and enter credentials
2. **Create Story**: Click the "Share your story..." input
3. **View Feed**: All posts appear in chronological order
4. **Engage**: Like posts and add comments
5. **Logout**: Click logout button in navbar

### For Admins

1. **Login**: Navigate to `/admin-login` with admin credentials
2. **View Stats**: Dashboard tab shows platform statistics
3. **Manage Users**: Users tab displays all users with engagement metrics
4. **Manage Posts**: Posts tab shows all content with ability to delete
5. **Monitor Engagement**: View real-time statistics on all tabs
6. **Logout**: Click logout button

## 🎨 Theme Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | #2e7d32 | Headers, buttons, text accents |
| Light Green | #66bb6a | Secondary buttons, hover states |
| Light Background | #f5f5f5 | Page backgrounds |
| White | #ffffff | Cards, forms |
| Dark Text | #333333 | Body text |
| Muted Text | #999999 | Secondary text |

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (below 768px)

## 🔄 Component Architecture

### Auth Flow
```
App.js
├── /login → UserLogin.js (Public)
├── /admin-login → AdminLogin.js (Public)
├── /home → ProtectedRoute → UserHome.js (User only)
└── /admin-dashboard → ProtectedRoute → AdminDashboard.js (Admin only)
```

### User Components
```
UserHome.js
├── NavBar (with logout)
├── CreatePost.js (Post creation)
└── Feed.js
    └── PostCard.js (repeating)
        ├── Like button
        └── Comments section
```

### Admin Components
```
AdminDashboard.js
├── AdminStats.js (Dashboard overview)
├── AdminUsers.js (User management)
└── AdminPosts.js (Post management)
```

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Real database (MongoDB, PostgreSQL, etc.)
- [ ] User profile pages
- [ ] Search functionality
- [ ] Hashtags and mentions
- [ ] User follow/unfollow
- [ ] Notifications
- [ ] Dark mode
- [ ] Image attachments
- [ ] Advanced analytics
- [ ] User roles (moderator, contributor, etc.)

## 📦 Dependencies

- **react**: ^19.2.4 - UI library
- **react-dom**: ^19.2.4 - React DOM rendering
- **react-router-dom**: ^7.13.1 - Routing
- **bootstrap**: ^5.3.8 - CSS framework
- **react-bootstrap**: ^2.10.10 - Bootstrap components
- **react-icons**: ^5.6.0 - Icon library

## 🧪 Testing

Run tests with:
```bash
npm test
```

Check for linting issues:
```bash
npm run lint
```

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

Built with React, featuring:
- Modular component architecture
- Separate authentication and data modules
- CSS-based theming
- Protected routes
- Mock data for demonstration

---

**Enjoy sharing your stories!** 📖✨
