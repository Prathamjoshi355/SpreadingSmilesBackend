# API Documentation - NGO Backend

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-api-domain.com/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Login Admin
**POST** `/auth/login`

**Public Route**

**Request Body:**
```json
{
  "email": "admin@ngo.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "65f4a8d9c1234567890abcd",
    "email": "admin@ngo.com"
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. Register Admin (First Time Only)
**POST** `/auth/register`

**Public Route**

**Request Body:**
```json
{
  "email": "admin@ngo.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "65f4a8d9c1234567890abcd",
    "email": "admin@ngo.com"
  }
}
```

---

### 3. Get Current Admin
**GET** `/auth/me`

**Protected Route** (Requires token)

**Response (200):**
```json
{
  "success": true,
  "admin": {
    "_id": "65f4a8d9c1234567890abcd",
    "email": "admin@ngo.com",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Blog Endpoints

### 1. Create Blog
**POST** `/blog`

**Protected Route** (Admin only)

**Request Body:**
```json
{
  "title": "Our NGO's Impact in 2024",
  "content": "# Markdown content here\n\nDetailed blog post content...",
  "coverImage": "https://cloudinary.com/image.jpg",
  "excerpt": "Short summary of the blog",
  "author": "NGO Team"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65f4a8d9c1234567890abcd",
    "title": "Our NGO's Impact in 2024",
    "slug": "our-ngos-impact-in-2024",
    "content": "# Markdown content here...",
    "coverImage": "https://cloudinary.com/image.jpg",
    "excerpt": "Short summary",
    "author": "NGO Team",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Get All Blogs
**GET** `/blog`

**Public Route**

**Query Parameters:**
- `page`: Page number (optional)
- `limit`: Items per page (optional)

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65f4a8d9c1234567890abcd",
      "title": "Blog Title",
      "slug": "blog-title",
      "excerpt": "Short excerpt",
      "coverImage": "https://...",
      "author": "NGO Team",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 3. Get Blog by Slug
**GET** `/blog/:slug`

**Public Route**

**URL Parameters:**
- `slug`: Blog slug (e.g., "our-ngos-impact-in-2024")

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f4a8d9c1234567890abcd",
    "title": "Our NGO's Impact in 2024",
    "slug": "our-ngos-impact-in-2024",
    "content": "Full markdown content...",
    "coverImage": "https://...",
    "excerpt": "Short excerpt",
    "author": "NGO Team",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 4. Update Blog
**PUT** `/blog/:id`

**Protected Route** (Admin only)

**URL Parameters:**
- `id`: Blog ID

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "coverImage": "https://new-image.jpg"
}
```

**Response (200):** Same as Create Blog

---

### 5. Delete Blog
**DELETE** `/blog/:id`

**Protected Route** (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

---

## Activity Endpoints

### 1. Create Activity
**POST** `/activity`

**Protected Route** (Admin only)

**Request Body:**
```json
{
  "title": "Blood Donation Camp",
  "description": "Annual blood donation camp at community center",
  "category": "health",
  "date": "2024-02-15T10:00:00Z",
  "location": "Community Center, City",
  "images": ["https://image1.jpg", "https://image2.jpg"],
  "volunteers": 25
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65f4a8d9c1234567890abcd",
    "title": "Blood Donation Camp",
    "description": "Annual blood donation camp...",
    "category": "health",
    "date": "2024-02-15T10:00:00Z",
    "location": "Community Center, City",
    "images": ["https://image1.jpg"],
    "volunteers": 25,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Get All Activities
**GET** `/activity`

**Public Route**

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [/* activity objects */]
}
```

---

### 3. Get Activity by ID
**GET** `/activity/:id`

**Public Route**

---

### 4. Update Activity
**PUT** `/activity/:id`

**Protected Route** (Admin only)

---

### 5. Delete Activity
**DELETE** `/activity/:id`

**Protected Route** (Admin only)

---

## Gallery Endpoints

### 1. Upload Image
**POST** `/gallery`

**Protected Route** (Admin only)

**Request Body:**
```json
{
  "imageUrl": "https://cloudinary.com/image.jpg",
  "title": "Community Event Photo",
  "description": "Photo from our community event",
  "category": "event"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65f4a8d9c1234567890abcd",
    "imageUrl": "https://cloudinary.com/image.jpg",
    "title": "Community Event Photo",
    "description": "Photo from our community event",
    "category": "event",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Get All Gallery Images
**GET** `/gallery`

**Public Route**

**Response (200):**
```json
{
  "success": true,
  "count": 25,
  "data": [/* image objects */]
}
```

---

### 3. Get Images by Category
**GET** `/gallery/category/:category`

**Public Route**

**URL Parameters:**
- `category`: 'event', 'team', 'activity', 'impact', 'other'

---

### 4. Delete Image
**DELETE** `/gallery/:id`

**Protected Route** (Admin only)

---

## Donation Endpoints

### 1. Create Donation (Frontend)
**POST** `/donate`

**Public Route**

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 100,
  "paymentId": "ch_1234567890abcd",
  "message": "Keep up the good work!",
  "isAnonymous": false
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65f4a8d9c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 100,
    "currency": "USD",
    "paymentId": "ch_1234567890abcd",
    "status": "completed",
    "message": "Keep up the good work!",
    "isAnonymous": false,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Get All Donations
**GET** `/donate`

**Protected Route** (Admin only)

**Response (200):**
```json
{
  "success": true,
  "count": 50,
  "totalAmount": 5000,
  "data": [/* donation objects */]
}
```

---

### 3. Get Donation Statistics
**GET** `/donate/stats`

**Protected Route** (Admin only)

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalDonations": 50,
    "totalAmount": 5000
  }
}
```

---

### 4. Update Donation
**PUT** `/donate/:id`

**Protected Route** (Admin only)

**Request Body:**
```json
{
  "status": "completed"
}
```

---

## Volunteer Endpoints

### 1. Register Volunteer (Frontend)
**POST** `/volunteer`

**Public Route**

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "interest": ["education", "health"],
  "message": "I'm passionate about helping children",
  "availability": "weekends"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65f4a8d9c1234567890abcd",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "interest": ["education", "health"],
    "message": "I'm passionate...",
    "availability": "weekends",
    "status": "new",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Get All Volunteers
**GET** `/volunteer`

**Protected Route** (Admin only)

**Response (200):**
```json
{
  "success": true,
  "count": 100,
  "data": [/* volunteer objects */]
}
```

---

### 3. Get Volunteer Statistics
**GET** `/volunteer/stats`

**Protected Route** (Admin only)

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalVolunteers": 100,
    "activeVolunteers": 45,
    "newRequests": 12
  }
}
```

---

### 4. Update Volunteer
**PUT** `/volunteer/:id`

**Protected Route** (Admin only)

**Request Body:**
```json
{
  "status": "active"
}
```

---

### 5. Delete Volunteer
**DELETE** `/volunteer/:id`

**Protected Route** (Admin only)

---

## Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Only admins can access this route"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Blog not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Request Examples

### Using cURL
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ngo.com","password":"password"}'

# Create Blog
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title":"My Blog",
    "content":"Content",
    "coverImage":"https://example.com/image.jpg"
  }'
```

### Using JavaScript/Fetch
```javascript
// Login
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@ngo.com', password: 'password' })
});

const data = await response.json();
const token = data.token;

// Protected Request
const blogResponse = await fetch('http://localhost:3000/api/blog', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Blog Title',
    content: 'Content',
    coverImage: 'https://example.com/image.jpg'
  })
});
```

### Using Axios
```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Login
const loginResponse = await api.post('/auth/login', {
  email: 'admin@ngo.com',
  password: 'password'
});

const token = loginResponse.data.token;

// Set Authorization Header
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Create Blog
const blogResponse = await api.post('/blog', {
  title: 'Blog Title',
  content: 'Content',
  coverImage: 'https://example.com/image.jpg'
});
```

---

## Rate Limiting

- No rate limit currently implemented
- Recommended to add in production:
  - 100 requests per 15 minutes per IP
  - 1000 requests per hour per IP

---

## Best Practices

1. **Always include Authorization header** for protected routes
2. **Validate input** before sending requests
3. **Handle errors** gracefully on frontend
4. **Use HTTPS** in production
5. **Refresh tokens** if expired
6. **Cache responses** where appropriate
7. **Implement request timeouts**

---

## Support

For issues or questions, check the BACKEND.md documentation or contact the development team.
