# 🎓 Online Course Platform – MERN Stack Application

A modern, full-stack **Online Learning Management System (LMS)** built using the **MERN stack**.  
This platform allows students to explore courses, enroll, watch lessons, and track progress, while admins can manage courses and lessons efficiently.

🌐 **Live Demo**  
👉 Not deployed yet

---

## ✨ Features

### 🔐 Authentication & Security
- User Registration & Login
- JWT-based Authentication
- Password hashing using **bcrypt**
- Protected routes (frontend & backend)
- Role-based access control (Admin / User)

### 📚 Course Management (User)
- Browse all free and paid courses
- View course details
- Enroll in courses
- Access enrolled courses in **My Courses**
- Continue learning anytime

### ▶️ Course Player
- Dedicated course player page
- Lesson list sidebar
- Video lesson playback
- Lesson descriptions
- Mark lessons as completed
- Track course progress
- Automatically mark course as completed after all lessons

### 💳 Payment Flow
- Demo payment page for paid courses
- Enroll only after successful payment
- Free courses can be enrolled instantly

### 🧑‍💼 Admin Panel
- Admin dashboard
- Create, edit, and delete courses
- Add, edit, and delete lessons
- Manage lessons per course
- Secure admin-only access

### 🎨 UI & UX
- Fully responsive design
- Built with **React + Tailwind CSS**
- Clean, modern, and user-friendly interface
- Smooth navigation experience

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt

---

## 📁 Project Structure

```text
Online-Course-Platform/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ │ ├── admin/
│ │ │ └── common/
│ │ ├── pages/
│ │ │ ├── admin/
│ │ │ └── user/
│ │ ├── routes/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
└── README.md
```
---

## 🔑 Environment Variables

### Backend (backend/.env)
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (frontend/.env)
```bash
VITE_API_URL=http://localhost:5000/api
```

## ⚙️ Local Development Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/online-course-platform.git
cd online-course-platform
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

```bash
📍 Frontend: http://localhost:5173
📍 Backend: http://localhost:5000
```

---

## 🧠 What I Learned From This Project

- Implementing JWT authentication with role-based access

- Protecting routes in React and Express

- Designing RESTful APIs

- Managing course–lesson relationships

- Building a complete course player system

- Tracking user learning progress

- Admin dashboard and content management
  
---

## 📌 Future Enhancements

- Real payment gateway integration (Razorpay / Stripe)

- Course certificates

- Quizzes & assessments

- Course ratings & reviews

- Search and filters

- Deployment (Render & Netlify)

--- 

🌐 Live Demo

The SkillSphere – Full Stack E-Learning Platform is live and fully deployed.

Frontend (Vercel):
https://skill-sphere-beta.vercel.app

Backend API (Render):
https://skill-sphere-vioy.onrender.com

--- 

## 👨‍💻 Author
Gous Bahurupi
MERN Stack Developer
📍 India
