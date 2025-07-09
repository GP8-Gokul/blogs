A full-stack blog platform built with Node.js, Express, and MongoDB that allows users to create, read, update, and delete blog posts with user authentication.

live-link: https://blogs-5ppq.onrender.com/

## Features

- **User Authentication**: Secure signup and signin with JWT tokens
- **Blog Management**: Create, edit, delete, and view blog posts
- **Rich Text Editor**: Content-editable interface with HTML formatting support
- **User-Specific Blogs**: View all blogs or filter by current user
- **Responsive Design**: Clean, modern UI with CSS styling
- **Content Sanitization**: XSS protection using DOMPurify

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **dotenv** - Environment variable management

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling and layout
- **JavaScript (ES6+)** - Client-side scripting
- **Axios** - HTTP client for API requests
- **DOMPurify** - HTML sanitization library

## Project Structure

```
├── src/
│   ├── index.js          # Main server file
│   ├── db.js            # Database models and connection
│   └── .env             # Environment variables
├── assets/
│   ├── sign.html        # Authentication page
│   ├── viewAllBlogs.html # All blogs view
│   ├── createBlog.html   # Blog creation form
│   ├── updateBlog.html   # Blog editing form
│   ├── viewBlogById.html # Individual blog view
│   └── *.js, *.css      # Frontend scripts and styles
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the src directory:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   PORT=3000
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /signup` - Create a new user account
- `POST /signin` - User login

### Blog Operations
- `GET /view-all-blogs` - Get all blogs (authenticated)
- `GET /blogs-by-user` - Get current user's blogs (authenticated)
- `GET /blog-by-user/:id` - Get specific blog by ID (authenticated)
- `POST /create-blogs` - Create a new blog (authenticated)
- `PUT /edit-blog/:id` - Update an existing blog (authenticated)
- `DELETE /delete-blog/:id` - Delete a blog (authenticated)

### Page Routes
- `GET /` - Authentication page
- `GET /all-blogs` - All blogs view
- `GET /user-blogs` - User's blogs view
- `GET /create-blogs` - Blog creation page
- `GET /blogs/:id` - Individual blog view
- `GET /update-blog/:id` - Blog editing page

## Features in Detail

### User Authentication
- Secure user registration and login
- JWT-based session management
- Password verification
- Protected routes requiring authentication

### Blog Management
- Rich text editor with formatting support
- Content sanitization for security
- CRUD operations for blog posts
- User-specific blog filtering

### Security Features
- JWT token authentication
- XSS protection with DOMPurify
- Input validation and sanitization
- Protected API endpoints

## Database Schema

### Users Collection
```javascript
{
  name: String,
  username: String,
  password: String
}
```

### Blogs Collection
```javascript
{
  title: String,
  author: String,
  content: String,
  userId: ObjectId
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Contact

For questions or support, please open an issue on the GitHub repository.
