# Backend Documentation - NGO Project

## Overview

Complete Node.js + Express REST API backend for the NGO website with MongoDB database, JWT authentication, and comprehensive admin management system.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | Runtime |
| **Express** | 4.18.2 | Web Framework |
| **MongoDB** | Latest | Database |
| **Mongoose** | 7.5.0 | ODM |
| **JWT** | 9.0.2 | Authentication |
| **Bcrypt** | 2.4.3 | Password Hashing |
| **Multer** | 1.4.5 | File Uploads |
| **Cloudinary** | 1.40.0 | Image Storage |
| **Stripe** | 13.5.0 | Payment Processing |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/          # Business logic
│   │   ├── auth.controller.js
│   │   ├── activity.controller.js
│   │   ├── blog.controller.js
│   │   ├── gallery.controller.js
│   │   ├── donation.controller.js
│   │   └── volunteer.controller.js
│   │
│   ├── models/               # Database schemas
│   │   ├── Admin.js
│   │   ├── Activity.js
│   │   ├── Blog.js
│   │   ├── Gallery.js
│   │   ├── Donation.js
│   │   └── Volunteer.js
│   │
│   ├── routes/               # API endpoints
│   │   ├── auth.routes.js
│   │   ├── activity.routes.js
│   │   ├── blog.routes.js
│   │   ├── gallery.routes.js
│   │   ├── donation.routes.js
│   │   └── volunteer.routes.js
│   │
│   ├── middleware/           # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── services/             # External services
│   │   ├── cloudinary.service.js
│   │   └── payment.service.js
│   │
│   ├── config/               # Configuration
│   │   └── db.js
│   │
│   ├── utils/                # Utility functions
│   │   └── generateToken.js
│   │
│   ├── app.js                # Express app setup
│   └── server.js             # Server entry point
│
├── .env.example              # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.0.0
- **MongoDB** (Local or Atlas)
- **npm** or **yarn**

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Edit .env with your values

# Start development server
npm run dev

# Start production server
npm start
```

Server will run on `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register       # Register admin (first time only)
POST   /api/auth/login          # Login admin
GET    /api/auth/me             # Get current admin (Protected)
```

### Blog Management
```
POST   /api/blog                # Create blog (Protected)
GET    /api/blog                # Get all blogs (Public)
GET    /api/blog/:slug          # Get blog by slug (Public)
PUT    /api/blog/:id            # Update blog (Protected)
DELETE /api/blog/:id            # Delete blog (Protected)
```

### Activity Management
```
POST   /api/activity            # Create activity (Protected)
GET    /api/activity            # Get all activities (Public)
GET    /api/activity/:id        # Get activity by ID (Public)
PUT    /api/activity/:id        # Update activity (Protected)
DELETE /api/activity/:id        # Delete activity (Protected)
```

### Gallery Management
```
POST   /api/gallery             # Upload image (Protected)
GET    /api/gallery             # Get all images (Public)
GET    /api/gallery/category/:cat  # Get by category (Public)
DELETE /api/gallery/:id         # Delete image (Protected)
```

### Donations
```
POST   /api/donate              # Create donation (Public)
GET    /api/donate              # Get all donations (Protected)
GET    /api/donate/stats        # Get donation stats (Protected)
PUT    /api/donate/:id          # Update donation (Protected)
```

### Volunteers
```
POST   /api/volunteer           # Register volunteer (Public)
GET    /api/volunteer           # Get all volunteers (Protected)
GET    /api/volunteer/stats     # Get volunteer stats (Protected)
PUT    /api/volunteer/:id       # Update volunteer (Protected)
DELETE /api/volunteer/:id       # Delete volunteer (Protected)
```

---

## 📊 Database Models

### Admin
```javascript
{
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog
```javascript
{
  title: String (required),
  slug: String (auto-generated, unique),
  content: String (required),
  coverImage: String (URL),
  excerpt: String,
  author: String (default: "NGO"),
  createdAt: Date,
  updatedAt: Date
}
```

### Activity
```javascript
{
  title: String (required),
  description: String (required),
  category: String (enum: education, health, environment, community, disaster-relief),
  images: [String] (URL array),
  date: Date (required),
  location: String,
  volunteers: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Gallery
```javascript
{
  imageUrl: String (required),
  title: String,
  description: String,
  category: String (enum: event, team, activity, impact, other),
  createdAt: Date,
  updatedAt: Date
}
```

### Donation
```javascript
{
  name: String,
  email: String,
  amount: Number (required),
  currency: String (default: USD),
  paymentId: String (Stripe ID),
  status: String (enum: pending, completed, failed),
  message: String,
  isAnonymous: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Volunteer
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  interest: [String] (array of interests),
  message: String,
  availability: String (weekdays, weekends, anytime),
  status: String (new, contacted, active, inactive),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication

### JWT Token
- Used for admin authentication
- Token includes admin ID and role
- Expires in 7 days (configurable)

### Headers
```javascript
Authorization: Bearer <token>
```

### Example Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ngo.com", "password":"password"}'

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "email": "admin@ngo.com"
  }
}
```

---

## 🌐 Environment Variables

Create `.env` file:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ngo

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRE=7d

# Server
PORT=3000
NODE_ENV=development

# Cloudinary (Image uploads)
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Stripe (Payments)
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend
FRONTEND_URL=http://localhost:5173

# Admin
ADMIN_SECRET=admin_secret_key_min_32_chars
```

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start with nodemon

# Production
npm start            # Start server

# Linting
npm run lint         # Run ESLint

# Testing
npm test             # Run tests
```

---

## 🔒 Security Features

✅ **Password Hashing** - Bcrypt with salt rounds  
✅ **JWT Authentication** - Stateless token-based auth  
✅ **CORS** - Configured for frontend domain  
✅ **Input Validation** - Zod schema validation  
✅ **Error Handling** - Centralized error middleware  
✅ **Role-based Access** - Admin-only endpoints protected  
✅ **Database Indexes** - Indexed on frequently queried fields  

---

## 🖥️ API Request Examples

### Create Blog
```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Blog Title",
    "content": "Blog content here",
    "coverImage": "https://example.com/image.jpg",
    "excerpt": "Short excerpt"
  }'
```

### Create Activity
```bash
curl -X POST http://localhost:3000/api/activity \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Activity Title",
    "description": "Description",
    "category": "education",
    "date": "2024-12-25",
    "location": "City",
    "images": ["url1", "url2"]
  }'
```

### Register Volunteer
```bash
curl -X POST http://localhost:3000/api/volunteer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "interest": ["education", "health"],
    "availability": "weekends"
  }'
```

### Create Donation
```bash
curl -X POST http://localhost:3000/api/donate \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Donor Name",
    "email": "donor@example.com",
    "amount": 100,
    "paymentId": "ch_xxxxx",
    "message": "Keep up the good work"
  }'
```

---

## 🔧 Middleware

### Auth Middleware
- `protect`: Verifies JWT token in Authorization header
- `adminOnly`: Checks if user has admin role

### Error Middleware
- Handles all errors centrally
- Returns consistent error format
- Catches Mongoose validation errors
- Handles duplicate key errors

---

## 📚 Response Format

### Success Response
```javascript
{
  "success": true,
  "data": { /* data object */ },
  "count": 10  // For list endpoints
}
```

### Error Response
```javascript
{
  "success": false,
  "message": "Error description"
}
```

---

## 🐛 Common Issues

### MongoDB Connection Failed
```
Solution: Check MONGODB_URI in .env file
- Local: mongodb://localhost:27017/ngo
- Atlas: mongodb+srv://user:pass@cluster.mongodb.net/ngo
```

### JWT Token Invalid
```
Solution: Token might be expired or corrupted
- Clear localStorage and login again
- Check JWT_SECRET matches on backend
```

### CORS Error
```
Solution: Update FRONTEND_URL in .env
- Development: http://localhost:5173
- Production: your_frontend_domain.com
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

---

## 📦 Deployment

### Heroku
```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_uri

# Deploy
git push heroku main
```

### Vercel Functions
- Convert to serverless functions
- Update MongoDB connection handling

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔗 Integration with Frontend

### Base URL Configuration
```javascript
// frontend/.env.local
VITE_API_URL=http://localhost:3000/api
```

### API Client
```javascript
// frontend/src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 📊 Monitoring & Logging

### Console Logs
- Request start/end
- Database connection status
- Error stack traces

### Best Practices
- Use structured logging in production
- Implement rate limiting
- Add request/response logging
- Monitor database performance

---

## 📚 Resources

- [Express Documentation](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [JWT Documentation](https://jwt.io)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Stripe API](https://stripe.com/docs)
- [Cloudinary API](https://cloudinary.com/documentation)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/name`
4. Create Pull Request

---

## 📝 License

This project is part of the NGO website initiative.

---

## ⚠️ Important Rules (हर कोई याद रखे!)

❌ **NO Hardcoded Data** - Everything from database  
❌ **NO API without Auth** - Protect admin routes  
❌ **NO Mixed Logic** - Clean separation of concerns  
❌ **NO Local Storage** - Use Cloudinary for images  

✅ **Clean Code** - Modular, readable, maintainable  
✅ **Security First** - Always validate input  
✅ **Database Indexed** - Fast queries  
✅ **Error Handling** - Graceful failures  
