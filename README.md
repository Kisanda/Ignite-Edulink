# Ignite Edulink – Full Stack Project

Complete source code for the **Ignite Edulink** international education consultancy website.

```
ignite-edulink-project/
├── frontend/       React + Vite website
└── backend/        Node.js + Express REST API
```

---

## 🚀 Quick Start (First Time)

### Step 1 – Install all dependencies
Open a terminal inside `ignite-edulink-project/` and run:
```bash
npm run install:all
```

### Step 2 – Configure the backend
```bash
cd backend
cp .env.example .env
```
Open `.env` and set `JWT_SECRET` to any long random string.

### Step 3 – Seed the database
```bash
npm run seed
```
Creates the SQLite DB, tables, admin account, and sample data.

### Step 4 – Run the backend
Open **Terminal 1**:
```bash
npm run dev:backend
```
Backend runs on → **http://localhost:5000**

### Step 5 – Run the frontend
Open **Terminal 2**:
```bash
npm run dev:frontend
```
Website runs on → **http://localhost:5173**

---

## 🗂 Folder Overview

### Frontend (`/frontend`)
| File/Folder | Purpose |
|---|---|
| `src/App.jsx` | Main website – all sections (Hero, Destinations, Services, etc.) |
| `src/CountryPage.jsx` | Individual country detail pages |
| `src/main.jsx` | React entry point |
| `src/services/api.js` | API calls to the backend |
| `public/` | Images (country photos, logo, feather) |
| `vite.config.js` | Vite config with `/api` proxy to backend |

### Backend (`/backend`)
| File/Folder | Purpose |
|---|---|
| `src/server.js` | Express app entry point |
| `src/config/database.js` | SQLite setup + helpers |
| `src/controllers/` | Business logic for each feature |
| `src/routes/` | Route definitions |
| `src/middleware/` | Auth (JWT), validation, error handling |
| `src/utils/` | Logger, mailer, pagination, response helpers |
| `src/utils/seed.js` | Database seeder |
| `.env.example` | Environment variable template |

---

## 🔑 Admin Login

After seeding, log in at the API:
```
POST http://localhost:5000/api/auth/login
{ "email": "admin@igniteedulink.com", "password": "Admin@123!" }
```
Returns a JWT token. Use `Authorization: Bearer <token>` for admin endpoints.

---

## 📡 Key API Endpoints

| Action | Method | URL |
|---|---|---|
| Book consultation | POST | `/api/consultations` |
| Subscribe newsletter | POST | `/api/newsletter/subscribe` |
| Contact form | POST | `/api/contact` |
| List events | GET | `/api/events` |
| Register for event | POST | `/api/events/:slug/register` |
| Blog posts | GET | `/api/blog` |
| University enquiry | POST | `/api/universities/enquire` |
| Admin dashboard | GET | `/api/admin/dashboard/stats` |

Full API docs → see `backend/README.md`

---

## 📧 Email Setup (Optional)

To send real confirmation emails, add Gmail credentials to `backend/.env`:
```env
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
```
Without this, emails are logged to console — everything still works for development.

---

## 🏗 Production Build

```bash
# Build frontend for production
cd frontend && npm run build
# Serve the dist/ folder via Nginx or any static host

# Run backend in production
cd backend && NODE_ENV=production npm start
```

---

© 2025 Ignite Edulink (Pvt) Ltd. All rights reserved.
