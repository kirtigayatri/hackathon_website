# **Hackathon Management System – Full Stack Web Application**

**Live Website:** [https://hackathon-website-eight-ebon.vercel.app](https://hackathon-website-eight-ebon.vercel.app)
* **Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js)

---

## **1. Project Overview**

This project is a fully functional **Hackathon Management System** designed for managing ** College Hackathon**.
The system supports:

* User registration and authentication
* Team creation and management
* Online quiz rounds
* Payment upload and verification
* Admin dashboard
* Certificate template upload
* Live leaderboard system
* Media storage via Cloudinary
* Email notifications via Nodemailer
* MongoDB Atlas cloud database integration

The application is built using the MERN stack and deployed on Render.

---

## **2. Objectives**

✔ Create a scalable, real-world event management system
✔ Implement a secure authentication mechanism
✔ Manage teams, members, payments, and quiz submissions
✔ Provide an admin-only panel with full event control
✔ Deploy both frontend and backend on cloud platforms
✔ Integrate MongoDB Atlas for cloud database access

---

## **3. System Architecture**

The project follows a **client–server architecture**:

### **Frontend (Client) – React**

* User Interface
* Routing (React Router)
* Axios for API communication
* Components for forms, dashboards, quizzes, etc.
* TailwindCSS + custom design

### **Backend (Server) – Node + Express**

* Authentication routes
* Team creation and verification
* Payment proof upload (Multer)
* Quiz management
* Certificate management
* Admin-only routes
* Middleware for security & error handling

### **Database – MongoDB Atlas**

* Users
* Teams
* Questions
* Submissions
* Certificates
* Payments
  (All connected via Mongoose schemas)

---

## **4. Features Implemented**

### **User Features**

* Register & Login with JWT Authentication
* Join/Create team and manage team members
* Attempt online quiz rounds
* View real-time results & team status
* Download event certificates (when uploaded by admin)

### **Admin Features**

* Comprehensive Admin Dashboard
* View all users and manage/delete teams
* Verify manual team payments securely
* Upload certificate templates (Round 1 & 2)
* Manage quiz questions and state-based workflows
* Access round results & live leaderboard

### **Technical Features**

* JWT-based secure login and session management
* Password hashing using bcrypt
* File upload and media storage using Multer & Cloudinary
* Email notifications powered by Nodemailer
* Server-side input validation using express-validator
* Centralized error handling
* Role-based access control (Admin vs User)
* Cloud deployment using Vercel (Frontend) and Render (Backend)
* MongoDB Atlas Cloud Database Integration

---

## **5. Deployment Links**

| Component       | URL                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------- |
| **Frontend**    | [https://hackathon-website-eight-ebon.vercel.app](https://hackathon-website-eight-ebon.vercel.app) |
| **Backend API** | [https://hackathon-website-lvny.onrender.com](https://hackathon-website-lvny.onrender.com)         |

Frontend is hosted on **Vercel** and backend on **Render**.
Database is hosted on **MongoDB Atlas**.

---

## **6. How to Run the Project Locally**

### **Step 1: Clone the project**

```bash
git clone https://github.com/kirtigayatri/hackathon_website.git
```

### **Step 2: Setup Environment Variables**

**Backend (`server/.env`):**
Create a `.env` file in the `server` directory and add the following:
```env
PORT=5000
MONGODB_URI=<Your MongoDB Atlas Connection String>
JWT_SECRET=<Your JWT Secret>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
```

**Frontend (`client/.env`):**
Create a `.env` file in the `client` directory and add the following:
```env
VITE_API_URL=http://localhost:5000
```

### **Step 3: Install dependencies and Run**

**Backend:**
Open a terminal and run:
```bash
cd server
npm install
npm run dev
```

**Frontend:**
Open a new terminal and run:
```bash
cd client
npm install
npm run dev
```

---

## **7. Testing Performed**

✔ Login/Signup tested with real MongoDB Atlas
✔ Team creation & deletion tested
✔ Quiz submission tested
✔ Payment proof upload tested
✔ Certificate upload tested
✔ Leaderboard auto-ranking verified
✔ Admin and user roles validated

---

## **8. Conclusion**

The Hackathon 2026 website is a complete production-level MERN application that demonstrates:

* Cloud deployment
* Database management
* Secure authentication
* Event workflow design
* Real-world problem solving
* Frontend + Backend integration
