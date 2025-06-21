# Lets'Talk -- Web chatting application
## Socket.io, Web RTC, mongoDB, auth, React, Typescript, Express, MERN
### In Progress

# LetsTalk - Real-time Chat Application

A modern real-time chat application built with the MERN stack and Socket.IO.

## 🚀 Features

- Real-time messaging with Socket.IO
- User authentication with JWT
- Online/offline status indicators
- Responsive design for mobile and desktop
- Profile pictures with fallback system
- Message timestamps
- User search functionality

## 🛠️ Tech Stack

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS + DaisyUI
- Socket.IO Client
- Zustand for state management
- React Router for navigation

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- Socket.IO for real-time communication
- Redis for session management
- JWT for authentication
- bcrypt for password hashing

## 🌐 Live Demo

[Your deployed app URL will be here]

## 📋 Prerequisites

Before deployment, ensure you have:

1. **MongoDB Database** (MongoDB Atlas recommended)
2. **Redis Database** (Upstash recommended for free tier)
3. **Render Account** (for deployment)

## 🚀 Deployment Steps

### 1. Setup Database Services

**MongoDB Atlas:**
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Get connection string
4. Replace `<username>`, `<password>`, and `<cluster-url>`

**Upstash Redis:**
1. Create account at [Upstash](https://upstash.com/)
2. Create a Redis database
3. Get Redis URL

### 2. Deploy to Render

1. **Connect Repository:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service:**
   - **Name:** `letstalk-app`
   - **Environment:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid for better performance)

3. **Set Environment Variables:**
   ```bash
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   UPSTASH_REDIS_URI=your_redis_connection_string
   ACCESSTOKEN_SECRET=your_super_secret_access_token_here
   REFRESHTOKEN_SECRET=your_super_secret_refresh_token_here
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for build and deployment to complete

### 3. Generate JWT Secrets

Use these commands to generate secure secrets:

```bash
# For Access Token Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# For Refresh Token Secret  
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🔧 Local Development

1. **Clone the repository:**
   ```bash
   git clone your-repo-url
   cd letstalk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

4. **Start development servers:**
   ```bash
   # Backend (from root)
   npm run dev

   # Frontend (in new terminal)
   cd frontend && npm run dev
   ```

## 📁 Project Structure

```
letstalk/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── lib/
│   └── socket/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── types/
│   └── dist/ (after build)
├── package.json
├── render.yaml
└── README.md
```

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check if all dependencies are installed
   - Verify Node.js version (>=18.0.0)
   - Check build logs for specific errors

2. **Socket Connection Issues:**
   - Verify CORS configuration
   - Check if WebSocket is supported
   - Ensure proper URL configuration

3. **Database Connection:**
   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure Redis URL is correct

### Logs:

- Check Render logs in dashboard
- Use browser dev tools for frontend errors
- Monitor server logs for backend issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- MongoDB for database
- Render for hosting
- All open-source contributors

---

Made with ❤️ by [Your Name]