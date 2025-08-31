# 🔧 Super Chats Backend API

A robust Node.js/Express backend API for the Super Chats real-time messaging application. Built with MongoDB, Socket.io, and JWT authentication for secure and scalable real-time communication.

## 🚀 Features

### Core API Features
- **RESTful API**: Clean and well-structured REST endpoints
- **Real-Time Communication**: Socket.io integration for instant messaging
- **User Authentication**: JWT-based authentication with HTTP-only cookies
- **Image Upload**: Cloudinary integration for media storage
- **Database Management**: MongoDB with Mongoose ODM
- **Security**: Password hashing, CORS, and input validation
- **Error Handling**: Comprehensive error management and logging

### Technical Features
- **Express.js**: Fast and minimalist web framework
- **MongoDB**: NoSQL database for flexible data storage
- **Socket.io**: Real-time bidirectional communication
- **JWT Authentication**: Secure token-based authentication
- **bcryptjs**: Password hashing and verification
- **Cloudinary**: Cloud image storage and optimization
- **CORS**: Cross-origin resource sharing support

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/        # Route controllers
│   │   ├── auth.controller.js    # Authentication logic
│   │   └── message.controller.js # Message handling
│   ├── middleware/         # Custom middleware
│   │   └── auth.middleware.js    # JWT authentication
│   ├── models/            # Database models
│   │   ├── user.model.js         # User schema
│   │   └── message.model.js      # Message schema
│   ├── routes/            # API routes
│   │   ├── auth.route.js         # Authentication routes
│   │   └── message.route.js      # Message routes
│   ├── lib/               # Utility libraries
│   │   ├── cloudinary.js         # Cloudinary configuration
│   │   ├── db.js                 # Database connection
│   │   ├── socket.js             # Socket.io setup
│   │   └── utils.js              # Helper functions
│   ├── seeds/             # Database seeds
│   │   └── user.seed.js          # Sample user data
│   └── index.js           # Server entry point
├── env.sample             # Environment variables template
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account

### Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp env.sample .env

# Configure environment variables
# Edit .env file with your credentials

# Start development server
npm run dev
```

## 📦 Available Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed database with sample data (if implemented)
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/super-chats
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/super-chats

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Database Connection
The app uses Mongoose to connect to MongoDB:

```javascript
// src/lib/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": ""
}
```

#### POST `/api/auth/login`
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": ""
}
```

#### POST `/api/auth/logout`
Logout user and clear authentication token.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### GET `/api/auth/check`
Check if user is authenticated (requires auth token).

**Response:**
```json
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": ""
}
```

#### PUT `/api/auth/update-profile`
Update user profile picture (requires auth token).

**Request Body:**
```json
{
  "profilePic": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

**Response:**
```json
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://res.cloudinary.com/..."
}
```

### Message Routes (`/api/messages`)

#### GET `/api/messages/users`
Get all users except the authenticated user (requires auth token).

**Response:**
```json
[
  {
    "_id": "user_id_1",
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "profilePic": "https://res.cloudinary.com/..."
  },
  {
    "_id": "user_id_2",
    "fullName": "Bob Johnson",
    "email": "bob@example.com",
    "profilePic": ""
  }
]
```

#### GET `/api/messages/:id`
Get conversation messages between authenticated user and specified user (requires auth token).

**Parameters:**
- `id`: User ID to get conversation with

**Response:**
```json
[
  {
    "_id": "message_id_1",
    "senderId": "user_id_1",
    "receiverId": "user_id_2",
    "text": "Hello!",
    "image": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "_id": "message_id_2",
    "senderId": "user_id_2",
    "receiverId": "user_id_1",
    "text": "Hi there!",
    "image": "https://res.cloudinary.com/...",
    "createdAt": "2024-01-01T00:01:00.000Z",
    "updatedAt": "2024-01-01T00:01:00.000Z"
  }
]
```

#### POST `/api/messages/send/:id`
Send a message to a specific user (requires auth token).

**Parameters:**
- `id`: Receiver user ID

**Request Body:**
```json
{
  "text": "Hello, how are you?",
  "image": null
}
```

**Response:**
```json
{
  "_id": "message_id",
  "senderId": "sender_user_id",
  "receiverId": "receiver_user_id",
  "text": "Hello, how are you?",
  "image": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔌 Socket.io Events

### Server Events

#### `connection`
Emitted when a client connects to the server.

#### `disconnect`
Emitted when a client disconnects from the server.

### Client Events

#### `newMessage`
Emitted when a new message is sent to a user.

**Payload:**
```json
{
  "_id": "message_id",
  "senderId": "sender_user_id",
  "receiverId": "receiver_user_id",
  "text": "Message content",
  "image": "image_url_or_null",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🗄️ Database Models

### User Model
```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
}, { timestamps: true });
```

### Message Model
```javascript
const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
}, { timestamps: true });
```

## 🔐 Authentication & Security

### JWT Authentication
The API uses JWT tokens stored in HTTP-only cookies for security:

```javascript
// Generate JWT token
const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
```

### Password Hashing
Passwords are hashed using bcryptjs:

```javascript
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

### CORS Configuration
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === "development" 
    ? "http://localhost:5173" 
    : "https://your-frontend-domain.com",
  credentials: true,
}));
```

## 🖼️ Image Upload

### Cloudinary Integration
Images are uploaded to Cloudinary for storage and optimization:

```javascript
// Upload image to Cloudinary
const uploadResponse = await cloudinary.uploader.upload(image);
const imageUrl = uploadResponse.secure_url;
```

### Supported Formats
- JPEG, JPG
- PNG
- GIF
- WebP

### File Size Limits
- Maximum file size: 10MB
- Recommended: Under 5MB for optimal performance

## 🚀 Deployment

### Production Setup
```bash
# Install dependencies
npm install

# Set environment variables
# Configure production environment variables

# Start production server
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Deployment Platforms

#### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Configure environment variables

#### Heroku
1. Create Heroku app
2. Connect GitHub repository
3. Set environment variables
4. Deploy

#### Railway
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically

## 🧪 Testing

### Running Tests
```bash
# Run unit tests (if implemented)
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### API Testing
Use tools like Postman or Thunder Client to test API endpoints:

1. **Authentication Flow**:
   - POST `/api/auth/signup` → Get user data
   - POST `/api/auth/login` → Get authentication cookie
   - Use cookie for authenticated requests

2. **Message Flow**:
   - GET `/api/messages/users` → Get user list
   - GET `/api/messages/:id` → Get conversation
   - POST `/api/messages/send/:id` → Send message

## 📊 Monitoring & Logging

### Error Handling
```javascript
// Global error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined
  });
});
```

### Request Logging
```javascript
// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});
```

## 🔍 Code Quality

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
  },
};
```

### Code Style
- Use ES6+ features
- Follow RESTful conventions
- Implement proper error handling
- Use meaningful variable names
- Add JSDoc comments for complex functions

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
# Check MongoDB connection
mongo --eval "db.runCommand('ping')"

# Verify connection string
echo $MONGODB_URI
```

**Socket.io Connection Issues**
- Check CORS configuration
- Verify frontend URL
- Ensure proper event handling

**Authentication Issues**
- Clear browser cookies
- Check JWT secret
- Verify token expiration

**Image Upload Issues**
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper image format

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Socket.io Documentation](https://socket.io/docs/)
- [JWT Documentation](https://jwt.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass

---

**Backend API built with ❤️ using Node.js, Express, and MongoDB**
