# ✨ Full Stack Realtime Chat App ✨
## Super Chats

---

![Demo App Screenshot](./frontend/public/chat1.png)  

This is a fully functional real-time chat application built using the MERN stack, Socket.io, TailwindCSS, and DaisyUI. The app provides features similar to WhatsApp, offering a seamless messaging experience with real-time updates.  

---

## 🌟 Features  

- **Real-Time Messaging**: Powered by Socket.io for instant communication.  
- **Authentication & Authorization**: Secure login using JWT.  
- **Online Status**: Display the online status of users.  
- **Responsive Design**: Styled with TailwindCSS and DaisyUI for a modern, responsive interface.  
- **Global State Management**: Efficient state handling with Zustand.  
- **Error Handling**: Robust error management on both server and client.  
- **Image Upload**: Integrated with Cloudinary for media handling.  
- **Free Deployment**: Easily deploy on free platforms like Vercel or Render.  

---

## 🚀 Tech Stack  

- **Frontend**: React, TailwindCSS, DaisyUI  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Real-Time Communication**: Socket.io  
- **State Management**: Zustand  
- **Hosting**: Cloudinary (for media), deployment-ready for Vercel or Render  

---

## 📸 Screenshots  

![Chat App Screenshot](./frontend/public/screenshot-for-readme.png)  

---

## ⚙️ Setup  

### Prerequisites  

Ensure you have the following installed:  
- Node.js  
- MongoDB  

### 1. Clone the Repository  

```shell  
git clone https://github.com/its-kundan/Super-Chats.git  
cd Super-Chats  
```  

### 2. Setup `.env` File  

Create a `.env` file in the root directory with the following keys:  

```env  
MONGODB_URI=your_mongodb_connection_string  
PORT=5001  
JWT_SECRET=your_jwt_secret  
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name  
CLOUDINARY_API_KEY=your_cloudinary_api_key  
CLOUDINARY_API_SECRET=your_cloudinary_api_secret  
NODE_ENV=development  
```  

### 3. Install Dependencies  

Navigate to the root and frontend folders to install dependencies:  

```shell  
npm install  
cd frontend  
npm install  
```  

### 4. Start the Application  

#### Development Mode  

Start both the frontend and backend servers for development:  

```shell  
npm run dev  
```  

#### Production Build  

To build and start the app in production:  

```shell  
npm run build  
npm start  
```  

---

## 🎯 How to Use  

1. Register or log in using your email and password.  
2. Start a chat with any user.  
3. Experience real-time messaging, online status updates, and image sharing.  

---

## 🌐 Deployment  

Follow the tutorial to deploy this app for free on platforms like Vercel, Render, or Railway.  

---



## 🛠️ Contribution  

Feel free to fork this repository, make improvements, and submit pull requests.  

---

## 📬 Contact  

For any issues or suggestions, feel free to open an issue or contact me via:  
- [GitHub Profile](https://github.com/its-kundan)  
- [Email](mailto:kundan51kk@gmail.com)  

--- 

Enjoy chatting! 😊