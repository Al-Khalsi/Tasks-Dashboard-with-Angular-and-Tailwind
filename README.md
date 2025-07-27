# 🧩 Team Tasks Dashboard

A lightweight task management dashboard built with **Angular** and **Tailwind CSS**. This project allows users to view, add, edit, and filter team tasks. It’s designed as a frontend test task to showcase Angular fundamentals, component design, routing, reactive forms, and service-based architecture.

---

## 🚀 Features

### ✅ Task Dashboard (`/tasks`)
- List of team tasks displayed as cards or rows
- Task fields include:
  - Title
  - Description
  - Completion Status (Completed / Not Completed)
  - Assigned User
- Filter Options:
  - Filter by task status
  - Search by task title

### ✍️ Task Form (`/tasks/new` & `/tasks/:id/edit`)
- Reactive Form with validation
  - Title (required)
  - Description (optional)
  - Assigned User (dropdown)
  - Completion Status (checkbox)
- Form works both for adding and editing tasks

### 👥 User Management (Bonus)
- Assigned User dropdown is populated by fetching from:


### 🌐 Routing
- `/tasks` – View all tasks
- `/tasks/new` – Add new task
- `/tasks/:id/edit` – Edit existing task

### 💾 State Management
- Tasks stored in **LocalStorage** to persist between reloads
- All logic encapsulated in Angular services

### 🎨 UI & UX
- Clean, responsive layout using **Tailwind CSS**
- Mobile-friendly and minimal design

---

## 🛠️ Tech Stack

- [Angular 19](https://angular.io/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- RxJS for state handling
- LocalStorage for persistence

---

## 📦 Installation

1. **Clone the repository**
 ```bash
 git clone https://github.com/Al-Khalsi/team-tasks-dashboard.git
 cd team-tasks-dashboard
