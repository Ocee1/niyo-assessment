### Project Documentation

#### Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
   - [User Authentication](#user-authentication)
     - [Sign Up](#sign-up)
     - [Login](#login)
   - [Task Management](#task-management)
     - [Create Task](#create-task)
     - [Get All Tasks](#get-all-tasks)
     - [Get Task by ID](#get-task-by-id)
     - [Update Task](#update-task)
     - [Delete Task](#delete-task)
6. [Conclusion](#conclusion)

### Introduction

This document provides instructions on how to set up and run the task management system on your local machine. The system includes user authentication and task management features, including real-time updates via WebSockets.

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later) or yarn
- MongoDB 

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ocee1/niyo-assessment.git
   cd niyo-assessment
   ```

2. **Install dependencies:**
   ```
   yarn install
   ```

3. **Set up environment variables:**

    Create a .env file in the root directory and add the following variables:

    MONGODB_URI=mongodb://localhost:27017/your-database-name
    JWT_SECRET='input-hash or secret'
    EXPIRES_IN='15m'
    REFRESH_EXPIRES_IN='7d'

    PORT=4000
4. **Run database migrations:**
   ```bash
   npm run typeorm migration:run
   # or
   yarn typeorm migration:run
   ```

### Running the Application

1. **Start the application:**
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

   The application will be available at `http://localhost:4000`.

### API Endpoints

#### User Authentication

##### Sign Up

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Response:**
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
  ```

##### Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "jwt_token"
  }
  ```

#### Task Management

##### Create Task

- **URL:** `/tasks`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Request Body:**
  ```json
  {
    "title": "Task title",
    "description": "Task description"
  }
  ```
- **Response:**
  ```json
  {
    "id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "userId": "user_id"
  }
  ```

##### Get All Tasks

- **URL:** `/tasks`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": "task_id",
      "title": "Task title",
      "description": "Task description",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "user": "user_id"
    }
  ]
  ```

##### Get Task by ID

- **URL:** `/tasks/:id`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "userId": "user_id"
  }
  ```

##### Update Task

- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Request Body:**
  ```json
  {
    "title": "Updated title",
    "description": "Updated description"
  }
  ```
- **Response:**
  ```json
  {
    "id": "task_id",
    "title": "Updated title",
    "description": "Updated description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "userId": "user_id"
  }
  ```

##### Delete Task

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response:** `204 No Content`


### Conclusion

This documentation provides the necessary steps to set up and run the task management system on your local machine, along with details on the required API endpoints for user authentication and task management. 