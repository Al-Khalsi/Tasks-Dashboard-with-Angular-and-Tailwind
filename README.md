🧩 Team Tasks Dashboard
A lightweight task management dashboard built with Angular and Tailwind CSS with full authentication capabilities. This project allows users to register, login, and manage team tasks.

🚀 Features
🔐 Authentication System
User Registration (/register)

Username (required, min 3 chars)

Email (required, valid format)

Password (required, min 6 chars)

Password confirmation

Real-time validation with error messages

User Login (/login)

Login with either email or username

Password field

Form validation

Error handling

Protected Routes

All task routes require authentication

Unauthenticated users redirect to login page

Session Management

Persistent login state using LocalStorage

Automatic logout capability

✅ Task Dashboard (/tasks)
List of team tasks displayed as responsive cards

Task fields include:

Title

Description

Priority (High/Medium/Low)

Completion Status

Assigned User

Filter Options:

Filter by task status

Search by task title

Filter by priority level

✍️ Task Management
Add Task (/tasks/new)

Edit Task (/tasks/:id/edit)

Form Features:

Title (required)

Description (optional)

Priority selection

User assignment dropdown

Status toggle

Client-side validation

👥 User Management
Team member display section

User data fetched from:

bash
https://jsonplaceholder.typicode.com/users
Assign tasks to team members

🌐 Routing
/login - User login

/register - User registration

/logout - Session termination

/tasks - Main dashboard (protected)

/tasks/new - Add task (protected)

/tasks/:id/edit - Edit task (protected)

🛠️ Tech Stack
Angular 19

Tailwind CSS 4

RxJS for reactive state management

LocalStorage for:

Persistent user sessions

Task data storage

User credentials storage (in secure format)

Standalone components architecture

🔒 Data Storage
The application uses browser's LocalStorage to persist:

User Data:

Stored under auth_users key

Contains:

User ID (auto-generated)

Username

Email

Hashed password (basic implementation)

Account creation timestamp

Session Data:

Current user stored under current_user key

Cleared on logout

Task Data:

Stored under tasks key

Full CRUD functionality

📦 Installation & Setup
Clone the repository

bash
git clone https://github.com/Al-Khalsi/team-tasks-dashboard.git
cd team-tasks-dashboard
Install dependencies

bash
npm install
Run development server

bash
npm start
Access the application

text
http://localhost:4200
🧪 Testing Credentials
For quick testing, you can use these default credentials after registering:

Username: testuser
Email: test@example.com
Password: password123

🚨 Security Notes
This implementation uses basic client-side storage

For production use:

Passwords should be properly hashed

Consider adding server-side validation

Implement proper session tokens

All authentication occurs client-side in this demo version

📝 License
MIT License - Free for personal and commercial use
