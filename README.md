# Tasks API

A secure, multi-user REST API built with NestJS, TypeORM, and PostgreSQL.

## Features

- Full CRUD operations for Tasks
- User registration and JWT authentication
- Passwords hashed with bcrypt
- Per-user data isolation (users only see their own tasks)
- Input validation with class-validator
- Interactive API documentation via Swagger
- PostgreSQL database hosted on Render
- Deployed and live

## Live Demo

- API: https://redesigned-spork-lra2.onrender.com
- Docs: https://redesigned-spork-lra2.onrender.com/api

## Tech Stack

- Framework: NestJS
- Database: PostgreSQL (via TypeORM)
- Auth: JWT (Passport)
- Validation: class-validator
- Docs: Swagger / OpenAPI

## Endpoints

| Method | Route | Description | Auth Required |
|--------|-------|-------------|----------------|
| POST | /users | Register a new user | No |
| POST | /auth/login | Log in, get JWT token | No |
| GET | /tasks | Get your tasks | Yes |
| POST | /tasks | Create a task | Yes |
| GET | /tasks/:id | Get one task | Yes |
| PATCH | /tasks/:id | Update a task | Yes |
| DELETE | /tasks/:id | Delete a task | Yes |

## Running Locally

npm install
npm run start:dev

Create a .env file with:
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
PORT=3000
