# Cloudinary Setup Guide - Spreading Smiling NGO

## 🎯 Folder Structure in Cloudinary

आपका Cloudinary account इस structure के साथ organize होगा:

```
spreading_smiling/
├── blogs/                    # Blog cover images
│   ├── blog-1.jpg
│   ├── blog-2.jpg
│   └── ...
├── gallery/                  # Gallery images
│   ├── event-1.jpg
│   ├── team-photo.jpg
│   └── ...
└── activities/              # Activity images
    ├── camp-photo-1.jpg
    ├── camp-photo-2.jpg
    └── ...
```

---

## 📋 Step 1: Create Cloudinary Account

1. Go to: https://cloudinary.com/users/register/free
2. Sign up with your email
3. Create account
4. Verify email

---

## 📋 Step 2: Get Your Credentials

### In Cloudinary Dashboard:

1. **Settings > API Keys** पर जाओ
2. अपने credentials को copy करो:
   - **Cloud Name** (नीले box में)
   - **API Key**
   - **API Secret**

---

## 📋 Step 3: Update .env File

अपना `.backend/.env` file update करो:

```env
# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Example:
```env
CLOUDINARY_NAME=dxyz1234
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc123xyz456
```

---

## 🚀 How to Upload Files

### 1. **Blog Upload** (Single Image)

```bash
# Using Postman or cURL
POST /api/blog
Headers:
  Authorization: Bearer <token>
  Content-Type: multipart/form-data

Body:
  - image: (select file)
  - title: "Blog Title"
  - content: "# Blog content..."
  - excerpt: "Short excerpt"
```

**Files upload to:** `spreading_smiling/blogs/`

---

### 2. **Gallery Upload** (Single Image)

```bash
POST /api/gallery
Headers:
  Authorization: Bearer <token>
  Content-Type: multipart/form-data

Body:
  - image: (select file)
  - title: "Photo Title"
  - description: "Photo description"
  - category: "event" | "team" | "activity" | "impact"
```

**Files upload to:** `spreading_smiling/gallery/`

---

### 3. **Activity Upload** (Multiple Images - upto 5)

```bash
POST /api/activity
Headers:
  Authorization: Bearer <token>
  Content-Type: multipart/form-data

Body:
  - images: (select up to 5 files)
  - title: "Activity Title"
  - description: "Activity description"
  - category: "education" | "health" | "environment"
  - date: "2024-02-15"
  - location: "City Name"
```

**Files upload to:** `spreading_smiling/activities/`

---

## 🎨 Admin Panel Upload

### Blog में से Upload करो:

```
1. Login: /admin-login
2. Go to: /admin/blogs
3. Click: "Add Blog"
4. Select file → Upload
5. File automatically goes to: spreading_smiling/blogs/
```

---

## 📸 Frontend Upload Example

### Using Fetch API:

```javascript
const uploadBlog = async (formData) => {
  const response = await fetch('http://localhost:3000/api/blog', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData  // FormData automatically handles multipart/form-data
  });

  const data = await response.json();
  console.log('Image URL:', data.data.coverImage);
};

// Usage:
const form = new FormData();
form.append('image', fileInput.files[0]);
form.append('title', 'My Blog');
form.append('content', '# Content');

uploadBlog(form);
```

---

## 🧪 Test Upload with cURL

### Blog Upload Test:

```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg" \
  -F "title=Test Blog" \
  -F "content=Test content" \
  -F "excerpt=Test excerpt"
```

### Gallery Upload Test:

```bash
curl -X POST http://localhost:3000/api/gallery \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg" \
  -F "title=Test Photo" \
  -F "category=event"
```

---

## 📊 Check Cloudinary Dashboard

### Verify Uploads:

1. Go to **Cloudinary Dashboard**
2. Click **Media Library**
3. You'll see your folder structure:
   - `spreading_smiling/blogs/`
   - `spreading_smiling/gallery/`
   - `spreading_smiling/activities/`

---

## 🔗 Auto-Generated URLs

Upload के बाद automatically मिलेंगे URLs:

```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/spreading_smiling/blogs/abc123.jpg
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/spreading_smiling/gallery/xyz789.jpg
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/spreading_smiling/activities/def456.jpg
```

---

## ✨ Features Setup

### Transformations (Optional - Advanced):

```javascript
// Resize images automatically
// Add watermark
// Convert to WebP
// Compress quality

// Example URL with transformation:
// https://res.cloudinary.com/dxyz1234/image/upload/w_800,h_600,c_fill/spreading_smiling/blogs/image.jpg
```

---

## 🔒 Security Settings (Production)

### Restrict Uploads:

1. Go to **Settings > Security**
2. Enable: **Restrict API operations**
3. Only allow authorized uploads

---

## 🐛 Troubleshooting

### Upload Fails - "Missing credentials"
- ✗ .env में सही values नहीं हैं
- ✓ Cloudinary Dashboard से फिर से copy करो

### Upload Fails - "Invalid folder"
- ✗ Folder path गलत है
- ✓ Code में folder path check करो

### Image Not Showing
- ✗ Cloud name गलत है
- ✓ URL में अपना cloud name डालो

### Slow Upload
- ✗ Large file size
- ✓ Image compress करके upload करो

---

## 📁 Total Files Uploaded

यह counter automatically बढ़ेगा:

```
Cloudinary Dashboard:
- Total Images: XX
- Storage Used: XX MB
- Bandwidth: XX MB
```

---

## 💡 Pro Tips

✅ **Organize** - अलग-अलग folders में रखो  
✅ **Backup** - Important images को backup रखो  
✅ **Cleanup** - Old images delete करो  
✅ **CDN** - Fast delivery के लिए use करो  
✅ **Responsive** - Different devices के लिए optimize  

---

## 🎉 You're All Set!

अब आपका Cloudinary perfectly setup है!

### Next Steps:
1. Backend start करो: `npm run dev`
2. Admin panel खोलो
3. Files upload करो
4. Cloudinary Dashboard में check करो

**Happy Uploading!** 🚀
