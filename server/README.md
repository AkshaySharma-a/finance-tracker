# Finance Backend

Node.js + Express + MongoDB personal finance API.

## Features

- JWT Auth (register, login, refresh)
- User profile management
- Transaction CRUD (income/expense) with categories
- Dashboard summary with MongoDB aggregation + `.reduce()`
- Zod validation, custom errors, repository pattern, closure factory middleware

## Setup

1. `cp .env.example .env`
2. Update `MONGO_URI` and `JWT_SECRET`
3. `npm install`
4. `npm run dev`

API base: `http://localhost:5000/api`
