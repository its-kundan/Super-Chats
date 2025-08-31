# 🎨 Super Chats Frontend

A modern, responsive React frontend for the Super Chats real-time messaging application. Built with Vite, TailwindCSS, and DaisyUI for a beautiful and intuitive user experience.

## 🚀 Features

### User Interface
- **Modern Design**: Clean and intuitive interface with DaisyUI components
- **Responsive Layout**: Mobile-first design that works on all devices
- **Theme System**: Multiple themes with local storage persistence
- **Real-Time Updates**: Live message delivery and online status
- **Image Sharing**: Drag-and-drop image upload with preview
- **Loading States**: Skeleton loaders and smooth transitions

### Technical Features
- **React 18**: Latest React features with hooks and concurrent rendering
- **Vite**: Fast development server and optimized builds
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **Zustand**: Lightweight state management
- **Socket.io Client**: Real-time communication
- **React Router**: Client-side routing
- **Axios**: HTTP client with interceptors
- **React Hot Toast**: Beautiful toast notifications

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── avatar.png         # Default avatar
│   ├── chat1.png          # Demo screenshot
│   └── vite.svg           # Vite logo
├── src/
│   ├── components/        # Reusable components
│   │   ├── AuthImagePattern.jsx
│   │   ├── ChatContainer.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── MessageInput.jsx
│   │   ├── Navbar.jsx
│   │   ├── NoChatSelected.jsx
│   │   ├── Sidebar.jsx
│   │   └── skeletons/     # Loading skeletons
│   ├── constants/         # App constants
│   │   └── index.js
│   ├── lib/              # Utility libraries
│   │   ├── axios.js      # HTTP client configuration
│   │   └── utils.js      # Helper functions
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── SignUpPage.jsx
│   ├── store/            # Zustand stores
│   │   ├── useAuthStore.js
│   │   ├── useChatStore.js
│   │   └── useThemeStore.js
│   ├── App.jsx           # Main app component
│   ├── index.css         # Global styles
│   └── main.jsx          # App entry point
├── .eslintrc.js          # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # TailwindCSS configuration
└── vite.config.js        # Vite configuration
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🎨 Styling

### TailwindCSS Configuration
The project uses TailwindCSS with DaisyUI for component styling:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate"],
  },
}
```

### Theme System
The app includes a theme switcher with multiple DaisyUI themes:
- Light
- Dark
- Cupcake
- Bumblebee
- Emerald
- Corporate

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

### API Configuration
The app uses Axios for API calls with automatic base URL configuration:

```javascript
// src/lib/axios.js
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api" 
    : "/api",
  withCredentials: true,
});
```

## 🏪 State Management

### Zustand Stores

#### Auth Store (`useAuthStore.js`)
Manages authentication state:
- User information
- Login/logout functionality
- Socket connection
- Online users

#### Chat Store (`useChatStore.js`)
Manages chat functionality:
- Messages
- Users list
- Selected user
- Message sending/receiving

#### Theme Store (`useThemeStore.js`)
Manages UI theme:
- Current theme
- Theme switching
- Local storage persistence

## 🧩 Components

### Core Components

#### ChatContainer
Main chat interface component that displays messages and handles real-time updates.

#### Sidebar
User list sidebar with online status indicators and user selection.

#### MessageInput
Message input component with text and image upload capabilities.

#### Navbar
Top navigation bar with user profile and theme switcher.

### Page Components

#### LoginPage/SignUpPage
Authentication pages with form validation and error handling.

#### HomePage
Main dashboard showing chat interface and user list.

#### ProfilePage
User profile management with image upload.

#### SettingsPage
Application settings and theme customization.

## 🔌 Socket.io Integration

Real-time features are powered by Socket.io:

```javascript
// Socket connection in useAuthStore
connectSocket: () => {
  const socket = io(BASE_URL);
  socket.on("connect", () => {
    console.log("Connected to server");
  });
  set({ socket });
}
```

### Socket Events
- `newMessage`: Receive new messages
- `userOnline`: User comes online
- `userOffline`: User goes offline

## 🎯 Key Features Implementation

### Real-Time Messaging
```javascript
// Subscribe to new messages
socket.on("newMessage", (newMessage) => {
  const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
  if (!isMessageSentFromSelectedUser) return;
  
  set({
    messages: [...get().messages, newMessage],
  });
});
```

### Image Upload
```javascript
// Handle image upload
const handleImageUpload = async (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    setSelectedImage(reader.result);
  };
  reader.readAsDataURL(file);
};
```

### Theme Switching
```javascript
// Theme store implementation
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

### Environment Variables for Production
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_SOCKET_URL=https://your-backend-url.com
```

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

## 🔍 Code Quality

### ESLint Configuration
The project uses ESLint for code quality:

```javascript
// eslint.config.js
export default [
  js.configs.recommended,
  ...react.configs.recommended,
  {
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
```

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript-like prop validation
- Maintain consistent naming conventions

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Clear `node_modules` and reinstall
- Check for missing dependencies
- Verify Vite configuration

**Socket Connection Issues**
- Ensure backend server is running
- Check CORS configuration
- Verify environment variables

**Styling Issues**
- Clear browser cache
- Check TailwindCSS configuration
- Verify DaisyUI installation

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [DaisyUI Documentation](https://daisyui.com/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Socket.io Client Documentation](https://socket.io/docs/v4/client-api/)

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass

---

**Frontend built with ❤️ using React, Vite, and TailwindCSS**
