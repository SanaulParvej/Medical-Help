# Medical Help

A full-stack healthcare web application with a React frontend and an Express + MongoDB backend.

## Quick Start

### 1) Run backend server

```bash
cd medical-help-server
npm install
npm run dev
```

Server runs on: `http://localhost:4000`

### 2) Run frontend client

Open a new terminal:

```bash
cd medical-help-client
npm install
npm run dev
```

Client runs on Vite default port (usually `http://localhost:5173`).

## README Automation

This README is generated from your current codebase to avoid manual rewrite every day.

One-time Git hook setup:

```bash
git config core.hooksPath .githooks
```

Run this command to refresh:

```bash
node scripts/update-readme.mjs
```

<!-- AUTO-GENERATED:START -->
## Auto-Generated Project Snapshot

Last updated: 2026-04-06 13:39:25.924Z

### Project Structure

```text
Medical-Help/
├── .githooks/
│   ├── pre-commit
│   └── pre-push
├── medical-help-client/
│   ├── public/
│   │   ├── banner_1.jpg
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── lottie/
│   │   │   ├── logo.png
│   │   │   └── react.svg
│   │   ├── Component/
│   │   │   ├── Loader/
│   │   │   └── Shared/
│   │   ├── contexts/
│   │   │   └── AuthContext/
│   │   ├── data/
│   │   ├── firebase/
│   │   │   └── firebase.init.js
│   │   ├── hooks/
│   │   │   └── useAdmin.jsx
│   │   ├── layout/
│   │   │   ├── AuthLayout/
│   │   │   ├── DashboardLayout/
│   │   │   └── HomeLayout/
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   ├── Auth/
│   │   │   ├── DashboardHome/
│   │   │   ├── DoctorDetails/
│   │   │   ├── Doctors/
│   │   │   ├── EmergencyService/
│   │   │   ├── Home/
│   │   │   ├── HomeCare/
│   │   │   ├── NursingCare/
│   │   │   ├── Services/
│   │   │   └── User/
│   │   ├── router/
│   │   │   └── router.jsx
│   │   ├── routes/
│   │   │   ├── AdminRoutes.jsx
│   │   │   └── PrivateRoutes.jsx
│   │   ├── utils/
│   │   │   └── image.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── medical-help-server/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── scripts/
│   └── update-readme.mjs
├── .gitattributes
├── README.md
└── workflow.md
```

### NPM Scripts

#### Client (medical-help-client)
- build: vite build
- dev: vite
- lint: eslint .
- preview: vite preview

#### Server (medical-help-server)
- dev: nodemon index.js
- start: node index.js
- test: echo "Error: no test specified" && exit 1

### Key Dependencies

#### Client Dependencies
- @tailwindcss/vite: ^4.2.0
- firebase: ^12.10.0
- lottie-react: ^2.4.1
- lucide-react: ^0.577.0
- react: ^19.2.0
- react-dom: ^19.2.0
- react-icons: ^5.5.0
- react-loader-spinner: ^8.0.2
- react-router: ^7.13.1
- react-tabs: ^6.1.0
- recharts: ^3.8.1
- sweetalert2: ^11.26.21
- swiper: ^12.1.2
- tailwindcss: ^4.2.0

#### Server Dependencies
- cors: ^2.8.6
- dotenv: ^16.6.1
- express: ^5.2.1
- mongodb: ^7.1.0

### API Endpoints (from server code)
- GET /users/role/:email
- GET /users
- POST /users
- POST /nursing-bookings
- GET /nursing-bookings
- PATCH /nursing-bookings/:id
- POST /homecare-bookings
- GET /homecare-bookings
- GET /doctors
- GET /doctors/:id
- POST /doctors
- DELETE /doctors/:id
- PATCH /doctors/:id
- POST /appointments
- GET /appointments
- PATCH /appointments/:id
- GET /admin-stats
- GET /
<!-- AUTO-GENERATED:END -->

## Licensing FAQ

This repository is under the **ISC** open-source license.
You do not need to purchase or request it.

To use it correctly:

1. Add a `LICENSE` file containing the ISC license text at the repo root.
2. Keep the original copyright and permission notice in redistributions.
3. Check third-party dependency licenses separately, since they may differ.
