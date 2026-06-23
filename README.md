# Secure Auth System

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

> Full-stack authentication system with JWT, email verification, and role-based access control.

## About

A complete authentication frontend built with React 19 and TypeScript, integrated with a dedicated [backend API](https://github.com/kevinmistrele/secure-auth-system-backend). Covers the full authentication lifecycle — registration, login, email verification, password recovery, and protected routes.

## Features

- User registration with email and password
- Login with JWT token-based session management
- Email verification flow
- Password recovery via email (Nodemailer)
- Protected routes with token validation
- Form validation with React Hook Form and Zod
- Toast feedback with Sonner
- Light and dark theme support (next-themes)
- Responsive UI with shadcn/ui components

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Notifications | Sonner |
| Theme | next-themes |
| Deploy | Vercel |

## Backend

This project consumes the [secure-auth-system-backend](https://github.com/kevinmistrele/secure-auth-system-backend) API built with Express, MongoDB, JWT, and Nodemailer.

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see [secure-auth-system-backend](https://github.com/kevinmistrele/secure-auth-system-backend))

### Installation

```bash
git clone https://github.com/kevinmistrele/secure-auth-system.git
cd secure-auth-system
npm install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
VITE_API_BASE_URL=http://localhost:3333
```

### Running

```bash
npm run dev
```

Access at `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components (shadcn/ui)
├── pages/            # Route-level pages (Login, Register, Dashboard)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── routes/           # Route definitions and protected route guards
```

## Author

Made by [Kevin Mistrele](https://github.com/kevinmistrele)
