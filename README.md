# Task Manager App

This backend application is built using Node.js and Express. It serves as the server-side logic for a task management system, providing RESTful APIs for handling user authentication, task management, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **User Authentication**: Register, login, and manage users with JWT-based authentication.
- **Task Management**: Create, update, delete, and retrieve tasks.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.x or later)
- [MySQL](https://www.mysql.com/) (v8.0 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AhmedHafez13/kn-task-manager-express.git
   cd kn-task-manager-express
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory and configure the environment variables in `.env.example`

### Running the Application

To start the server in development mode, run:

```bash
npm run dev
```

or

```bash
yarn dev
```

or using `docker compose` (this will start a MySQL)

```bash
docker compose build && docker compose up
```

This will start the server on `http://localhost:5000`.

## Project Structure

The project structure is organized as follows:

```plaintext
├── src
│   ├── entity/           # TypeORM entities (data models)
│   ├── modules/
│   │   └── module-name
│   │       ├── module-name.controller       # Route handlers for the APIs
│   │       ├── module-name.routes           # Route configuration for the module
│   │       ├── module-name.service          # Services for the module
│   │       └── module-name.validation       # Validations and schemas definition
│   ├── middleware/       # Custom middleware functions
│   ├── repositories/     # Data access layer for interacting with the database
│   ├── utils/            # Utility functions and helpers
│   ├── routes/           # Global routes configuration and base router class
│   └── server.ts         # Main application entry point
├── typeorm
│   ├── migrations/       # Database migrations
│   └── data-source.ts    # TypeORM data source configuration
├── types
│   └── custom.d.ts       # Custom global types
├── .env                  # Environment variables
├── package.json          # npm/yarn dependencies and scripts
└── README.md             # Project documentation
```

## API Endpoints

### Authentication

- **POST** `/api/register` - Register a new user.
- **POST** `/api/login` - Authenticate a user and return a JWT token.

### Tasks

- **POST** `/api/tasks` - Create a new task.
- **GET** `/api/tasks` - Get all tasks for the authenticated user.
- **GET** `/api/tasks/:id` - Get a specific task by ID.
- **PUT** `/api/tasks/:id` - Update a specific task by ID.
- **PUT** `/api/tasks/:id/mark-completed` - Update a specific task completion status by ID.
- **DELETE** `/api/tasks/:id` - Delete a specific task by ID.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
