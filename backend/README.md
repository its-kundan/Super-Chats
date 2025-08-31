# Super Chats Backend

A real-time chat application backend built with Node.js, Express, Socket.IO, and MongoDB.

## Features

- 🔐 JWT-based authentication
- 💬 Real-time messaging with Socket.IO
- 📸 Image sharing with Cloudinary
- 👥 User management
- 🛡️ Secure cookie handling
- 🌐 CORS support
- 📊 MongoDB database

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)

## Setup

1. **Clone the repository and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/super-chats
   PORT=5001
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `PORT` | Server port | No | 5001 |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | - |
| `NODE_ENV` | Environment mode | No | development |
| `FRONTEND_URL` | Frontend URL for production | No | http://localhost:3000 |

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/update-profile` - Update user profile
- `GET /api/auth/check` - Check authentication status

### Messages
- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages with a specific user
- `POST /api/messages/send/:id` - Send a message to a user

### Health Check
- `GET /api/health` - Server health status

## Socket.IO Events

### Client to Server
- `connection` - User connects with userId in query
- `disconnect` - User disconnects

### Server to Client
- `getOnlineUsers` - List of online user IDs
- `newMessage` - New message received

## Database Models

### User
```javascript
{
  email: String (required, unique),
  fullName: String (required),
  password: String (required, min 6 chars),
  profilePic: String (default: ""),
  timestamps: true
}
```

### Message
```javascript
{
  senderId: ObjectId (ref: User, required),
  receiverId: ObjectId (ref: User, required),
  text: String,
  image: String,
  timestamps: true
}
```

## Error Handling

The backend includes comprehensive error handling:
- Input validation
- Database connection errors
- JWT token validation
- File upload errors
- Socket connection errors

## Security Features

- JWT tokens stored in httpOnly cookies
- Password hashing with bcrypt
- CORS protection
- Input sanitization
- Rate limiting (can be added)

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Logging
- Console logging for development
- Error logging for debugging

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

2. **JWT Token Issues**
   - Check JWT_SECRET in .env file
   - Ensure cookies are enabled in browser
   - Verify CORS settings

3. **Socket.IO Connection Issues**
   - Check CORS settings
   - Verify frontend URL in socket configuration
   - Ensure userId is passed in connection query

4. **Cloudinary Upload Errors**
   - Verify Cloudinary credentials
   - Check image format (base64 required)
   - Ensure proper error handling

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=*
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set secure JWT_SECRET
4. Configure Cloudinary credentials
5. Set FRONTEND_URL for CORS
6. Use PM2 or similar process manager

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
