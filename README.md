# 🤩 Team Tasks Dashboard

**A lightweight team task management dashboard built with Angular 19 and Tailwind CSS 4, featuring full authentication and session management.**

---

## 🚀 Features

### 🔐 Authentication System

* **User Registration** `/register`

  * Username (min 3 characters)
  * Valid email format
  * Password (min 6 characters)
  * Password confirmation
  * Real-time validation with error messages

* **User Login** `/login`

  * Login using email or username
  * Password field
  * Form validation & error handling

* **Protected Routes**

  * All task-related routes require authentication
  * Unauthenticated users are redirected to the login page

* **Session Management**

  * Persistent login state via LocalStorage
  * Automatic logout capability

---

## ✅ Task Dashboard `/tasks`

* Displays tasks as responsive cards

* Task Fields:

  * Title
  * Description
  * Priority (High / Medium / Low)
  * Completion status
  * Assigned user

* Filter & Search Options:

  * Filter by task status
  * Search by title
  * Filter by priority level

---

## ✍️ Task Management

* **Add New Task** `/tasks/new`
* **Edit Task** `/tasks/:id/edit`

Form Features:

* Required title
* Optional description
* Priority selection
* User assignment dropdown
* Status toggle
* Client-side form validation

---

## 👥 User Management

* Fetches team members from:
  `https://jsonplaceholder.typicode.com/users`
* Displays list of users
* Tasks can be assigned to any user

---

## 🌐 Routing

| Path              | Description        |
| ----------------- | ------------------ |
| `/login`          | User login         |
| `/register`       | User registration  |
| `/logout`         | Logout session     |
| `/tasks`          | Task dashboard     |
| `/tasks/new`      | Add new task       |
| `/tasks/:id/edit` | Edit existing task |

---

## 🛠️ Tech Stack

* Angular 19
* Tailwind CSS 4
* RxJS for reactive state
* LocalStorage for persistent data
* Standalone component architecture

---

## 🔒 Data Storage (LocalStorage)

### User Data:

* Stored under `auth_users`
* Fields:

  * Auto-generated ID
  * Username
  * Email
  * Hashed password (basic implementation)
  * Account creation timestamp

### Session:

* Current session stored under `current_user`
* Cleared on logout

### Tasks:

* Stored under `tasks`
* Full CRUD support

---

## 📦 Installation & Setup

```bash
git clone https://github.com/Al-Khalsi/team-tasks-dashboard.git
cd team-tasks-dashboard
npm install
npm start
```

Access the app:

```
http://localhost:4200
```

---

## 🥮 Testing Credentials

To test quickly after registration:

* **Username:** `testuser`
* **Email:** `test@example.com`
* **Password:** `password123`

---

## ⚠️ Security Notes

> This is a client-side demo. For production:

* Passwords should be hashed securely
* Add server-side validation
* Use secure session tokens

---

## 📝 License

**MIT License** — Free for personal and commercial use
