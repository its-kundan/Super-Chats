# 📡 Super Chats API Documentation

Complete API documentation for the Super Chats real-time messaging application. This document provides detailed information about all available endpoints, request/response formats, authentication, and real-time communication.

## 🌐 Base URL

- **Development**: `http://localhost:5001/api`
- **Production**: `https://your-backend-domain.com/api`

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Tokens are automatically handled via HTTP-only cookies.

### Authentication Flow

1. **Register** or **Login** to receive an authentication cookie
2. All subsequent requests will automatically include the authentication token
3. **Logout** to clear the authentication cookie

### Protected Routes

Most endpoints require authentication. Protected routes will return a `401 Unauthorized` status if no valid token is provided.

## 📋 API Endpoints

### Authentication Endpoints

#### 1. User Registration

**Endpoint:** `POST /api/auth/signup`

**Description:** Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `fullName`: Required, string
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Response (Success - 201):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": ""
}
```

**Response (Error - 400):**
```json
{
  "message": "Email already exists"
}
```

**Response (Error - 400):**
```json
{
  "message": "Password must be at least 6 characters"
}
```

#### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required

**Response (Success - 200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://res.cloudinary.com/..."
}
```

**Response (Error - 400):**
```json
{
  "message": "Invalid credentials"
}
```

#### 3. User Logout

**Endpoint:** `POST /api/auth/logout`

**Description:** Logout user and clear authentication token.

**Authentication:** Required

**Request Body:** None

**Response (Success - 200):**
```json
{
  "message": "Logged out successfully"
}
```

#### 4. Check Authentication Status

**Endpoint:** `GET /api/auth/check`

**Description:** Verify if user is authenticated and get user data.

**Authentication:** Required

**Request Body:** None

**Response (Success - 200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://res.cloudinary.com/..."
}
```

**Response (Error - 401):**
```json
{
  "message": "Unauthorized - No Token Provided"
}
```

#### 5. Update Profile Picture

**Endpoint:** `PUT /api/auth/update-profile`

**Description:** Update user's profile picture.

**Authentication:** Required

**Request Body:**
```json
{
  "profilePic": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

**Validation Rules:**
- `profilePic`: Required, base64 encoded image

**Response (Success - 200):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://res.cloudinary.com/cloud_name/image/upload/v1234567890/..."
}
```

**Response (Error - 400):**
```json
{
  "message": "Profile pic is required"
}
```

### Message Endpoints

#### 1. Get All Users

**Endpoint:** `GET /api/messages/users`

**Description:** Get list of all users except the authenticated user.

**Authentication:** Required

**Request Body:** None

**Response (Success - 200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "profilePic": "https://res.cloudinary.com/..."
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "fullName": "Bob Johnson",
    "email": "bob@example.com",
    "profilePic": ""
  }
]
```

#### 2. Get Conversation Messages

**Endpoint:** `GET /api/messages/:id`

**Description:** Get all messages between authenticated user and specified user.

**Authentication:** Required

**Parameters:**
- `id` (string): User ID to get conversation with

**Request Body:** None

**Response (Success - 200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "senderId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "receiverId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "text": "Hello! How are you?",
    "image": null,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
    "senderId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "receiverId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "text": "I'm doing great! Thanks for asking.",
    "image": "https://res.cloudinary.com/...",
    "createdAt": "2024-01-01T10:01:00.000Z",
    "updatedAt": "2024-01-01T10:01:00.000Z"
  }
]
```

**Response (Error - 404):**
```json
{
  "message": "User not found"
}
```

#### 3. Send Message

**Endpoint:** `POST /api/messages/send/:id`

**Description:** Send a message to a specific user.

**Authentication:** Required

**Parameters:**
- `id` (string): Receiver user ID

**Request Body:**
```json
{
  "text": "Hello, how are you?",
  "image": null
}
```

**Validation Rules:**
- `text`: Optional, string
- `image`: Optional, base64 encoded image
- At least one of `text` or `image` must be provided

**Response (Success - 201):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
  "senderId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "receiverId": "64f8a1b2c3d4e5f6a7b8c9d1",
  "text": "Hello, how are you?",
  "image": null,
  "createdAt": "2024-01-01T10:02:00.000Z",
  "updatedAt": "2024-01-01T10:02:00.000Z"
}
```

**Response (Error - 400):**
```json
{
  "message": "Message content is required"
}
```

## 🔌 Real-Time Communication (Socket.io)

The application uses Socket.io for real-time communication. Connect to the Socket.io server at the same base URL.

### Connection

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:5001", {
  withCredentials: true
});
```

### Socket Events

#### Client Events (Emitted by Client)

##### `join`
Join a user's personal room for receiving messages.

**Payload:**
```javascript
socket.emit("join", {
  userId: "64f8a1b2c3d4e5f6a7b8c9d0"
});
```

#### Server Events (Emitted by Server)

##### `newMessage`
Emitted when a new message is received.

**Payload:**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
  "senderId": "64f8a1b2c3d4e5f6a7b8c9d1",
  "receiverId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "text": "New message content",
  "image": null,
  "createdAt": "2024-01-01T10:03:00.000Z",
  "updatedAt": "2024-01-01T10:03:00.000Z"
}
```

##### `userOnline`
Emitted when a user comes online.

**Payload:**
```json
{
  "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
  "status": "online"
}
```

##### `userOffline`
Emitted when a user goes offline.

**Payload:**
```json
{
  "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
  "status": "offline"
}
```

### Socket Event Handling Example

```javascript
// Listen for new messages
socket.on("newMessage", (message) => {
  console.log("New message received:", message);
  // Update UI with new message
});

// Listen for user status changes
socket.on("userOnline", (data) => {
  console.log("User online:", data.userId);
  // Update user status in UI
});

socket.on("userOffline", (data) => {
  console.log("User offline:", data.userId);
  // Update user status in UI
});

// Handle connection events
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
```

## 📊 Data Models

### User Model

```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  fullName: String (required),
  password: String (required, min 6 chars),
  profilePic: String (default: ""),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model

```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: "User", required),
  receiverId: ObjectId (ref: "User", required),
  text: String (optional),
  image: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## 🖼️ Image Upload

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Size Limits
- **Maximum**: 10MB
- **Recommended**: Under 5MB for optimal performance

### Image Upload Process

1. **Convert to Base64**: Convert image file to base64 string
2. **Send to API**: Include base64 string in request body
3. **Server Processing**: Server uploads to Cloudinary
4. **Return URL**: Server returns Cloudinary URL

### Example Image Upload

```javascript
// Convert file to base64
const fileReader = new FileReader();
fileReader.onload = () => {
  const base64String = fileReader.result;
  
  // Send to API
  fetch('/api/messages/send/userId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: "Check out this image!",
      image: base64String
    })
  });
};
fileReader.readAsDataURL(imageFile);
```

## 🔒 Security Features

### JWT Token Security
- **Storage**: HTTP-only cookies (not accessible via JavaScript)
- **Expiration**: 15 days
- **Secure**: HTTPS only in production
- **SameSite**: Strict policy

### Password Security
- **Hashing**: bcryptjs with salt rounds of 10
- **Minimum Length**: 6 characters
- **No Plain Text**: Passwords never stored in plain text

### CORS Configuration
```javascript
{
  origin: process.env.NODE_ENV === "development" 
    ? "http://localhost:5173" 
    : "https://your-frontend-domain.com",
  credentials: true
}
```

## 📝 Error Handling

### Standard Error Responses

#### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

#### 401 Unauthorized
```json
{
  "message": "Unauthorized - No Token Provided"
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

### Error Response Format
All error responses follow a consistent format:
- `message`: Human-readable error description
- `error`: Technical error details (development only)

## 🧪 Testing the API

### Using cURL

#### Register a User
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

#### Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

#### Get Users (with authentication)
```bash
curl -X GET http://localhost:5001/api/messages/users \
  -b cookies.txt
```

### Using Postman

1. **Set up Collection**: Create a new collection for Super Chats API
2. **Configure Environment**: Set base URL variable
3. **Authentication**: Use cookie-based authentication
4. **Test Flow**: Follow the authentication flow described above

### Using Thunder Client (VS Code)

1. **Install Extension**: Install Thunder Client extension
2. **Create Collection**: Set up collection with base URL
3. **Configure Auth**: Set up cookie authentication
4. **Test Endpoints**: Test all endpoints systematically

## 🚀 Rate Limiting

Currently, the API does not implement rate limiting. For production deployment, consider implementing rate limiting using middleware like `express-rate-limit`.

### Recommended Rate Limits
- **Authentication**: 5 requests per minute per IP
- **Message Sending**: 60 requests per minute per user
- **General API**: 1000 requests per hour per user

## 📈 Performance Considerations

### Database Optimization
- **Indexes**: Ensure proper indexes on frequently queried fields
- **Pagination**: Implement pagination for large datasets
- **Caching**: Consider Redis for caching frequently accessed data

### Image Optimization
- **Compression**: Cloudinary automatically optimizes images
- **Formats**: Use WebP for better compression
- **Sizes**: Implement responsive image sizes

### Socket.io Optimization
- **Room Management**: Use rooms for efficient message delivery
- **Connection Limits**: Monitor and limit concurrent connections
- **Heartbeat**: Implement proper connection monitoring

## 🔄 API Versioning

Current API version: **v1**

Future versions will be available at:
- `/api/v2/...`
- `/api/v3/...`

## 📞 Support

For API support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/Super-Chats/issues)
- **Email**: your-email@example.com
- **Documentation**: This file and the main README.md

## 📄 License

This API is part of the Super Chats project and is licensed under the MIT License.

---

**API Documentation for Super Chats - Real-Time Messaging Application**
