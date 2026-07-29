# Kaventra Backend

Backend API powering the Kaventra Group digital ecosystem.

## About Kaventra Group

Kaventra Group helps international investors access Nigerian real estate through transparent, technology-driven services. This backend manages users, properties, verification workflows, documents, communications, and business operations, providing secure APIs for the website and mobile applications.

Founder: Akingbonmire Sunday Dayo

## Features (Current)

- User registration and JWT authentication
- Passwords hashed with bcrypt
- Full CRUD API (in progress, expanding toward Properties)
- Per-user data isolation
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

## Roadmap

This project is being actively built out to match the full Kaventra Backend Blueprint, including:

- Properties module
- Investors module
- Partners module
- Verification workflows
- Document management
- Payments
- Notifications
- Admin dashboard

## Running Locally

npm install
npm run start:dev

Create a .env file with:
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
PORT=3000
