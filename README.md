# Twitter Clone Frontend (Vite + React + TypeScript + Redux Toolkit + React-Bootstrap)

## Overview
Frontend that connects to the backend at `http://localhost:3000`.
Features:
- Register / Login with validation (react-hook-form + yup)
- Create Tweet (select recipients) with validation
- View My Tweets
- View Tweets Shared With Me
- Change Password
- Protected routes, loading states, alerts using React-Bootstrap

## Quick start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173

## Configuration
- Edit `src/config.ts` to change the backend base URL if needed (default is `http://localhost:3000`).

## Notes
- Ensure the backend is running (NestJS on port 3000).
- This project uses localStorage to persist the JWT token.