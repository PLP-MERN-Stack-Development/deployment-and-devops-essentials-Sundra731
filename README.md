# MERN Blog Application - Deployed

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js, featuring user authentication, comments, and advanced search/filtering capabilities.

## 🚀 Deployed Application URLs

### Frontend (Vercel)
- **Production**: [Add your deployed frontend URL here]

### Backend API (Render)
- **Production**: [Add your deployed backend API URL here]
- **Health Check**: [Add your backend URL here]/api/health

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Advanced Features](#advanced-feature)

---

## Features

### Core Functionality
- Create, Read, Update, and Delete blog posts
- User authentication (Register/Login)
- Google OAuth integration for seamless sign-in
- Category management for organizing posts
- View count tracking for each post
- Responsive design for all devices

### Advanced Features
- **User Authentication** - JWT-based authentication with Google OAuth support
- **Comments System** - Users can add, view, and delete comments on posts
- **Search & Filter** - Real-time search by title/content and filter by category
- **Pagination** - Backend support for paginated post listing
- **Modern UI** - Clean, professional design with smooth animations

---

##  Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Passport.js** - Authentication middleware
- **bcrypt.js** - Password hashing

---

## Project Structure

```
mern-stack-integration/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── CommentSection.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── CreatePost.jsx
│   │   │   ├── GoogleAuthSuccess.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── Register.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   │   └── passport.js   # Passport OAuth config
|   |   |__db.js
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── commentController.js
│   │   └── postController.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js       # Authentication middleware
│   ├── models/           # Mongoose models
│   │   ├── Category.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── categories.js
│   │   ├── comments.js
│   │   └── posts.js
│   ├── .env              # Environment variables
│   ├── package.json
│   └── server.js         # Entry point
│
└── README.md
```

---

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Google Cloud Console Account** - For OAuth credentials (optional)
- **Git** - For cloning the repository

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sundra731/mern-stack-integration-Sundra731
cd mern-stack-integration
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

---

## Environment Variables

### Server (.env)

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/mern-blog

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:3000
```

### Client (.env - Optional)

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Start MongoDB (if running locally)

```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

### Start the Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

### Start the Frontend Client

Open a new terminal:

```bash
cd client
npm run dev
```

The client will run on `http://localhost:3000` or `http://localhost:5173` (Vite default)

### Access the Application

Open your browser and navigate to:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/auth/google` | Initiate Google OAuth | No |
| GET | `/api/auth/google/callback` | Google OAuth callback | No |

### Post Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/posts/:id` | Get single post | No |
| POST | `/api/posts` | Create new post | Yes |
| PUT | `/api/posts/:id` | Update post | Yes |
| DELETE | `/api/posts/:id` | Delete post | Yes |

**Query Parameters for GET /api/posts:**
- `page` - Page number (default: 1)
- `limit` - Posts per page (default: 10)
- `category` - Filter by category ID
- `search` - Search by title or content

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | No |
| POST | `/api/categories` | Create category | Yes |

### Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts/:id/comments` | Get post comments | No |
| POST | `/api/posts/:id/comments` | Add comment | Yes |
| DELETE | `/api/posts/:id/comments/:commentId` | Delete comment | Yes |

### Example Request (Login)

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "_id": "650a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Advanced Features

### 1. User Authentication System
- **Traditional Auth:** Email/password registration and login
- **Google OAuth:** One-click sign-in with Google account
- **JWT Tokens:** Secure, stateless authentication
- **Protected Routes:** Middleware to secure endpoints

### 2. Comments Feature
- **Add Comments:** Authenticated users can comment on posts
- **Delete Comments:** Users can delete their own comments
- **Real-time Display:** Comments show user info and timestamps
- **Nested Structure:** Backend supports comment threading

### 3. Search & Filtering
- **Real-time Search:** Instant filtering as you type
- **Category Filter:** Dropdown to filter by post category
- **Combined Filters:** Use both search and category together
- **Results Counter:** Shows number of matching posts

### 4. Additional Features
- **View Counter:** Tracks post views automatically
- **Responsive Design:** Mobile-first, works on all devices
- **Error Handling:** Comprehensive error messages
- **Loading States:** User feedback during async operations
- **Form Validation:** Client and server-side validation

---

## Design Decisions

### UI/UX Choices
- **Centered Layout:** Container-based design (max-width: 1200px) for optimal readability
- **Color Scheme:** Earthy tones (#3d5a4c, #d4a574) for a modern, professional look
- **Typography:** Poppins font for clean, modern appearance
- **Spacing:** Generous padding and margins for breathing room
- **Animations:** Subtle hover effects and transitions for polish

### Technical Choices
- **Vite:** Faster build tool than Create React App
- **Axios Interceptors:** Centralized API error handling
- **Mongoose:** Schema validation at database level
- **JWT:** Stateless authentication for scalability
- **Express Middleware:** Modular, reusable code structure

---

## 🐛 Known Issues & Future Enhancements

### Current Limitations
- Image upload not implemented (can be added with Multer)
- Pagination UI only on backend (frontend shows all results)
- No rich text editor for post content
- Comments don't support nested replies

### Future Enhancements
- [ ] Add rich text editor (TinyMCE or Quill)
- [ ] Implement image uploads for featured images
- [ ] Add user profiles with avatars
- [ ] Email notifications for new comments
- [ ] Dark mode toggle
- [ ] Social media sharing buttons
- [ ] Post drafts and scheduling
- [ ] Admin dashboard

---

## 🚀 Deployment & CI/CD

### Production Optimizations Applied
- **Server**: Helmet security headers, compression, Morgan logging, MongoDB connection pooling
- **Client**: Code splitting with React.lazy, environment variables, optimized builds
- **Health Check**: `/api/health` endpoint for monitoring

### CI/CD Pipelines (GitHub Actions)
- **Server CI**: Tests, linting, and building for Node.js 16/18/20
- **Client CI**: Tests, linting, and building React application
- **Server CD**: Automated deployment to Render on successful CI
- **Client CD**: Automated deployment to Vercel on successful CI

### Deployment Scripts
```bash
# Deploy everything
./deployment/deploy.sh all

# Deploy only server
./deployment/deploy.sh server

# Deploy only client
./deployment/deploy.sh client
```

### Environment Variables Required
**Server (.env)**:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=https://your-frontend-domain.com
```

**Client (.env)**:
```
VITE_API_URL=https://your-backend-api.com/api
```

## 📊 Monitoring

### Health Check Endpoint
```
GET /api/health
Response: {"status": "OK", "message": "MERN Blog API is running", "timestamp": "...", "environment": "production"}
```

### Monitoring Scripts
```bash
# Check server health
node monitoring/health-check.js https://your-backend-url.com
```

## 🧪 Testing

### Manual Testing Checklist
- [x] User registration works
- [x] User login works
- [x] Google OAuth works
- [x] Create post works
- [x] View posts works
- [x] Search posts works
- [x] Filter by category works
- [x] Add comment works
- [x] Delete comment works
- [x] Protected routes redirect to login

### To Run Tests (if implemented)
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

---

## Contributing

This is an educational project for a MERN stack assignment. Contributions are welcome for learning purposes!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is created for educational purposes as part of a university assignment.

---

## Acknowledgments

- Instructor and course materials for guidance
- MongoDB documentation
- React documentation
- Express.js documentation
- Stack Overflow community
- Google OAuth documentation

---

## Support

If you encounter any issues:

1. Check the [Known Issues](#known-issues--future-enhancements) section
2. Ensure all environment variables are set correctly
3. Verify MongoDB is running
4. Check that all dependencies are installed
5. Review the console logs for errors

For additional help, please open an issue in the repository.

---

**Built with using the MERN Stack**
