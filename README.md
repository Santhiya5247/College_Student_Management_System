# College Student Management System

A full-stack web application designed to manage college student information efficiently. The system provides an admin interface to add, view, update, search, and manage student records using a React frontend, Flask backend, and MySQL database.

## Features

* Admin Login
* Dashboard with student statistics
* Add new student records
* View all students
* Update student information
* Search students
* Filter students by department
* Manage students across different departments
* React frontend connected with Flask REST APIs
* MySQL database integration
* Protected routes for authenticated pages
* Responsive and user-friendly interface

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript
* React.js
* React Router
* Axios
* Bootstrap

### Backend

* Python
* Flask
* Flask-CORS
* REST API

### Database

* MySQL
* MySQL Connector for Python

### Tools

* Visual Studio Code
* MySQL Workbench
* GitHub

## Project Structure

```text
College-Student-Management-System/
│
├── backend/
│   ├── app.py
│   ├── main.py
│   ├── database.py
│   ├── routes.py
│   ├── student.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddStudent.jsx
│   │   │   ├── ViewStudents.jsx
│   │   │   ├── UpdateStudent.jsx
│   │   │   ├── SearchStudent.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── ProtectedRoutes.jsx
│   │   ├── API.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── index.html
│
└── README.md
```

## Database

The application uses MySQL to store student information.

### Database Name

```text
student_management
```

Student records include details such as:

* Student ID
* Student Name
* Department
* Year
* Gender
* Contact Details
* Other Student Information

## API Endpoints

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/students`                | Get all students           |
| GET    | `/students?department=CSE` | Get students by department |
| POST   | `/students`                | Add a new student          |
| PUT    | `/students/<id>`           | Update student details     |
| DELETE | `/students/<id>`           | Delete a student           |

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure MySQL

Create the database in MySQL:

```sql
CREATE DATABASE student_management;
```

Update the MySQL connection details in `database.py` according to your local MySQL configuration.

### 4. Run Flask Backend

```bash
python app.py
```

The backend will run on:

```text
http://127.0.0.1:5000
```

### 5. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will run on the URL shown by Vite in the terminal.

## Application Flow

```text
Admin Login
     |
     v
Dashboard
     |
     v
Student Management
     |
     +---- Add Student
     |
     +---- View Students
     |
     +---- Update Student
     |
     +---- Search Student
     |
     v
React Frontend
     |
     v
Flask REST API
     |
     v
MySQL Database
```

## Project Objective

The main objective of this project is to develop a centralized student management system that reduces manual record management and provides an easy-to-use interface for administrators to manage college student information.

## My Role

I developed this project as a full-stack application and worked on:

* Designing the React frontend
* Creating reusable React components
* Implementing page navigation using React Router
* Creating protected routes
* Developing Flask REST APIs
* Connecting Flask with MySQL
* Implementing CRUD operations
* Designing and managing the database
* Connecting frontend APIs with backend
* Testing and debugging the application

## Future Enhancements

* Student authentication
* Admin authentication with database
* Pagination
* Advanced search and filtering
* Export student records to Excel/PDF
* Attendance management
* Student performance tracking
* Deployment to a cloud platform

## License

This project is created for educational and portfolio purposes.
