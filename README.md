# 🎓 Internship Portal

A full-stack **Internship Portal** designed to help students discover internships, apply for opportunities, manage applications, enroll in courses, track learning progress, and receive certificates.

The platform also provides an **Admin Panel** for managing students, internships, courses, lessons, applications, assignments, videos, and certificates.

---

## 📌 Overview

The Internship Portal is a web-based platform built to simplify the complete internship and learning management process.

Students can:

- Create and manage their profiles
- Browse available internships
- View detailed internship information
- Apply for internships
- Track application status
- Browse available courses
- Enroll in courses
- Watch course lessons/videos
- Track learning progress
- Complete lessons
- View completed courses
- Access certificates
- Manage their account

Administrators can:

- Manage students
- Create and manage internships
- Manage internship applications
- Create and manage courses
- Add lessons and videos
- Manage assignments
- Monitor student enrollments
- Track student learning progress
- Manage certificates

---

## ✨ Features

### 👨‍🎓 Student Features

#### Authentication

- Student registration
- Student login
- JWT-based authentication
- Protected routes
- Secure password hashing
- Persistent authentication

#### Student Dashboard

The dashboard provides an overview of the student's activity:

- Total enrolled courses
- Courses in progress
- Completed courses
- Overall learning progress
- Recent courses
- Student profile information

#### 👔 Internship Management

Students can:

- Browse available internships
- Search and explore internship opportunities
- View internship details
- View company information
- Check internship requirements
- Apply for internships
- Track submitted applications

#### 📝 Application Management

Students can:

- Submit internship applications
- View all submitted applications
- View application details
- Track application status
- View application history

Possible application statuses include:

- Pending
- Shortlisted
- Accepted
- Rejected

#### 📚 Course Management

Students can:

- Browse available courses
- View course details
- Check course information
- Enroll in courses
- Access enrolled courses
- Continue learning

#### 🎥 Course Learning

The learning system allows students to:

- Access course lessons
- Watch learning videos
- Navigate between lessons
- Mark lessons as completed
- Track course progress
- Continue from their current progress

#### 📊 Learning Progress

Student progress is tracked throughout the course.

The system can track:

- Completed lessons
- Total lessons
- Course completion percentage
- Enrollment status
- Learning progress

#### 🏆 Certificates

Students can:

- View earned certificates
- Access certificate information
- Track completed courses and certifications

#### 👤 Student Profile

Students can:

- View their profile
- Update personal information
- Manage account details

---

# 🛠️ Admin Features

The Admin Panel provides centralized management of the platform.

### 👥 Student Management

Administrators can:

- View registered students
- Manage student accounts
- View student information
- Monitor student activity

### 💼 Internship Management

Administrators can:

- Create internships
- Update internships
- Delete internships
- View internship listings
- Manage internship information
- Manage internship applications

### 📚 Course Management

Administrators can:

- Create courses
- Update courses
- Delete courses
- View courses
- Manage course information

### 📖 Lesson Management

Administrators can:

- Create lessons
- Update lessons
- Delete lessons
- Organize course content
- Manage lesson order

### 🎥 Video Management

Administrators can:

- Upload/manage course videos
- Associate videos with lessons
- Manage learning content

### 📝 Assignment Management

Administrators can:

- Create assignments
- Manage assignments
- Associate assignments with courses/lessons

### 📋 Application Management

Administrators can:

- View internship applications
- Review applications
- Update application status
- Monitor student applications

### 🎓 Certificate Management

Administrators can:

- Manage certificates
- Assign certificates to eligible students
- Track certificate records

---

# 🏗️ Project Architecture

The project follows a **client-server architecture**.

```text
                    ┌─────────────────────┐
                    │      Student        │
                    │      / Admin        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │  Pages / Components │
                    │  API Integration    │
                    └──────────┬──────────┘
                               │
                            Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │                     │
                    │ Routes / Controllers│
                    │ Middleware / APIs   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │                     │
                    │ Students            │
                    │ Internships         │
                    │ Applications        │
                    │ Courses             │
                    │ Enrollments         │
                    │ Progress            │
                    │ Certificates        │
                    └─────────────────────┘
```

---

# 📁 Project Structure

```text
Internship-portal/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   ├── adminAssignmentApi.js
│   │   │   ├── adminCourseApi.js
│   │   │   ├── adminInternshipApi.js
│   │   │   ├── adminLessonApi.js
│   │   │   ├── adminStudentApi.js
│   │   │   ├── adminVideoApi.js
│   │   │   ├── applicationApi.js
│   │   │   ├── authApi.js
│   │   │   ├── certificateApi.js
│   │   │   ├── courseApi.js
│   │   │   ├── enrollmentApi.js
│   │   │   ├── internshipApi.js
│   │   │   ├── studentApi.js
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── pages/
│   │   │   ├── student/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Courses.jsx
│   │   │   │   ├── CourseDetails.jsx
│   │   │   │   ├── CourseLearning.jsx
│   │   │   │   ├── Internships.jsx
│   │   │   │   ├── InternshipDetails.jsx
│   │   │   │   ├── ApplyInternship.jsx
│   │   │   │   ├── Applications.jsx
│   │   │   │   ├── ApplicationDetails.jsx
│   │   │   │   ├── MyApplications.jsx
│   │   │   │   ├── MyLearning.jsx
│   │   │   │   ├── Certificates.jsx
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   └── admin/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── studentController.js
│   │   ├── adminController.js
│   │   ├── internshipController.js
│   │   ├── applicationController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── certificateController.js
│   │
│   ├── models/
│   │   ├── Student.js
│   │   ├── Admin.js
│   │   ├── Internship.js
│   │   ├── Application.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Progress.js
│   │   └── Certificate.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── internshipRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   │
│   ├── uploads/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

# 💻 Technology Stack

## Frontend

- **React.js** – User interface
- **Vite** – Frontend build tool
- **React Router** – Client-side routing
- **Axios** – API communication
- **Tailwind CSS** – Styling
- **Framer Motion** – Animations
- **React Hook Form** – Form handling
- **Lucide React** – Icons

## Backend

- **Node.js** – Runtime environment
- **Express.js** – REST API framework
- **MongoDB** – Database
- **Mongoose** – MongoDB ODM
- **JWT** – Authentication
- **bcryptjs** – Password hashing
- **Multer** – File uploads
- **CORS** – Cross-origin resource sharing
- **dotenv** – Environment variables

---

# 🔐 Authentication

The application uses **JWT-based authentication**.

### Authentication Flow

```text
User Registration
       ↓
Password Hashing
       ↓
User Stored in MongoDB
       ↓
User Login
       ↓
Credentials Verified
       ↓
JWT Token Generated
       ↓
Token Stored by Client
       ↓
Token Sent with API Requests
       ↓
Auth Middleware Validates Token
       ↓
Protected Resource Access
```

Passwords are never stored as plain text. They are securely hashed using `bcryptjs`.

---

# 🗄️ Database Models

The backend uses MongoDB with Mongoose.

### Student

Stores student account and profile information.

### Admin

Stores administrator authentication and account information.

### Internship

Stores internship opportunities and related information.

### Application

Stores student internship applications and their status.

### Course

Stores course information and learning content.

### Enrollment

Connects students with courses they have enrolled in.

### Progress

Tracks student learning progress through course lessons.

### Certificate

Stores certificate information for completed learning programs.

---

# 🔌 API Structure

The backend exposes RESTful API endpoints.

Example API structure:

```text
/api/auth
/api/student
/api/internships
/api/applications
/api/courses
/api/enrollments
/api/dashboard
```

### Example Student APIs

```text
GET    /api/student/dashboard
GET    /api/student/profile
PUT    /api/student/profile
```

### Example Internship APIs

```text
GET    /api/internships
GET    /api/internships/:id
POST   /api/internships
PUT    /api/internships/:id
DELETE /api/internships/:id
```

### Example Application APIs

```text
GET    /api/applications
GET    /api/applications/:id
POST   /api/applications
PUT    /api/applications/:id
```

### Example Course APIs

```text
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id
```

### Example Enrollment APIs

```text
POST   /api/enrollments
GET    /api/enrollments
GET    /api/enrollments/:id
```

---

# ⚙️ Installation

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB
- Git

Check your Node.js installation:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/manavganeshweb/Internship-portal.git
```

Move into the project:

```bash
cd Internship-portal
```

---

# 🔧 Backend Setup

Go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The backend should run on:

```text
http://localhost:5001
```

---

# 🎨 Frontend Setup

Open another terminal and go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

Never commit sensitive environment variables to GitHub.

Example:

```env
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

The actual `.env` file should be added to `.gitignore`.

```gitignore
.env
.env.*
node_modules/
dist/
```

---

# 🧪 Testing

The backend APIs can be tested using tools such as:

- Postman
- Thunder Client
- Browser
- Frontend application

Recommended testing flow:

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Access Dashboard
   ↓
Browse Internships
   ↓
Apply
   ↓
Browse Courses
   ↓
Enroll
   ↓
Complete Lessons
   ↓
Track Progress
   ↓
Receive Certificate
```

---

# 🔒 Security

The project implements several security practices:

- Password hashing with bcrypt
- JWT authentication
- Protected backend routes
- Authentication middleware
- Environment variables for secrets
- CORS configuration
- Server-side authentication checks
- Sensitive files excluded through `.gitignore`

---

# 📱 Responsive Design

The frontend is designed to work across different screen sizes, including:

- Desktop
- Laptop
- Tablet
- Mobile

The interface uses Tailwind CSS for responsive layouts and reusable styling.

---

# 🎯 Project Goals

The main goals of the Internship Portal are:

1. Simplify internship discovery.
2. Provide an easy internship application process.
3. Allow students to track applications.
4. Provide integrated online learning.
5. Track student learning progress.
6. Provide course completion certificates.
7. Give administrators complete platform management.
8. Create a scalable full-stack architecture.

---

# 🔮 Future Improvements

Potential future improvements include:

- Email notifications
- Internship recommendation system
- Advanced search and filtering
- Resume upload and management
- Company/Recruiter accounts
- Real-time notifications
- Online assessments
- Student performance analytics
- Certificate verification system
- Advanced admin analytics dashboard
- Role-based permissions
- Cloud file storage
- Production deployment
- Automated email communication
- AI-powered internship recommendations

---

# 📸 Screenshots

Add screenshots of the application here.

Example:

```text
screenshots/
├── login.png
├── student-dashboard.png
├── internships.png
├── internship-details.png
├── applications.png
├── courses.png
├── course-learning.png
├── certificates.png
└── admin-dashboard.png
```

Then add them to the README:

```markdown
![Student Dashboard](screenshots/student-dashboard.png)
```

---

# 🌐 Repository

GitHub:

https://github.com/manavganeshweb/Internship-portal

---

# 👨‍💻 Developer

**Manav Ganesh H**

Computer Science Engineering Student  
Full-Stack Web Developer

### Technologies

```text
HTML
CSS
JavaScript
React
Node.js
Express.js
MongoDB
Mongoose
REST APIs
JWT
Tailwind CSS
Git
GitHub
```

---

# 📄 License

This project is developed as an internship/client project.

The source code is provided for educational and portfolio purposes. Please contact the author before reusing the project commercially.

---

## ⭐ Acknowledgements

Thanks to the project mentors and team members who provided guidance and feedback throughout the development of this Internship Portal.

---

## 📌 Project Status

**Status: Completed ✅**

The core student internship, application, course learning, progress tracking, certificate, authentication, and administrative functionality has been implemented.