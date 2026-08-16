Code Crate — Handoff
====================

Overview
--------
Small full-stack demo (React + Vite frontend, Express + Mongoose backend) implementing user auth (JWT cookie), repository CRUD, issues, a simple CLI, and demo scripts.

Quick local run
---------------
1. Install dependencies

```bash
npm --prefix backend-main install
npm --prefix frontend-main install
```

2. Configure environment
- Backend env: `backend-main/.env` (defaults provided). Ensure `MONGODB_URI` points to a running MongoDB (default: `mongodb://127.0.0.1:27017/codecrate`).

3. Start services

```bash
# Backend
npm --prefix backend-main run start

# Frontend (Vite)
npm --prefix frontend-main run dev
```

4. Run smoke/demo scripts (optional)

```bash
node tmp_e2e.js            # signup + login smoke test
node tmp_create_repo.js    # create a sample repository
node tmp_full_repo_flow.js # end-to-end create/update/fetch demo
```

Key files
---------
- Server entry & CLI: [backend-main/index.js](backend-main/index.js)
- Auth controller: [backend-main/controllers/userController.js](backend-main/controllers/userController.js)
- Repo controller: [backend-main/controllers/repoController.js](backend-main/controllers/repoController.js)
- Auth middleware: [backend-main/middleware/authMiddleware.js](backend-main/middleware/authMiddleware.js)
- Validation & rate limits: [backend-main/middleware/validateAuth.js](backend-main/middleware/validateAuth.js), [backend-main/middleware/rateLimiter.js](backend-main/middleware/rateLimiter.js)
- Models: [backend-main/models/userModel.js](backend-main/models/userModel.js), [backend-main/models/repoModel.js](backend-main/models/repoModel.js), [backend-main/models/issueModel.js](backend-main/models/issueModel.js)
- Frontend API client: [frontend-main/src/api.js](frontend-main/src/api.js)
- Frontend routes: [frontend-main/src/Routes.jsx](frontend-main/src/Routes.jsx)
- Frontend pages: [frontend-main/src/components/landing/Landing.jsx](frontend-main/src/components/landing/Landing.jsx), [frontend-main/src/components/dashboard/Dashboard.jsx](frontend-main/src/components/dashboard/Dashboard.jsx), [frontend-main/src/components/repo/RepoDetails.jsx](frontend-main/src/components/repo/RepoDetails.jsx), [frontend-main/src/components/create/CreateRepo.jsx](frontend-main/src/components/create/CreateRepo.jsx), [frontend-main/src/components/auth/Signup.jsx](frontend-main/src/components/auth/Signup.jsx)

Runtime notes & gotchas
-----------------------
- JWT is set as an httpOnly cookie named `token`; `api.js` uses `withCredentials: true` so browser requests include the cookie.
- For programmatic scripts the server returns `token` in JSON as well; scripts use that when needed.
- If port 3000 is already in use, free it (Windows):

```powershell
netstat -ano | findstr :3000
taskkill /PID <pid> /F
```

- Ensure MongoDB is running on the configured `MONGODB_URI` before starting backend.
- In development the `.env` file at [backend-main/.env](backend-main/.env) contains defaults.

Known issues & recommendations
-----------------------------
- Missing refresh-token flow and server-side token revocation (recommended P0 for production).
- Some UI flows use `prompt()` for quick edits — replace with proper modals or inline editors for production UX.
- Avoid storing `userId` in `localStorage` in production; prefer server session checks or ephemeral client state.

Next recommended actions
------------------------
- Implement refresh-token rotation and logout invalidation (backend + client).
- Replace `prompt()` edit flows with a modal or inline editor in the dashboard and repo details.
- Add a small integration smoke test (Playwright/Cypress) and a developer `README` with these commands.

Contact / context
-----------------
This repository contains recent work to harden auth, add cookie-based sessions, centralize API, and provide demo scripts and an improved landing layout. For details see `AUDIT.md` and `DEMO.md` in the repo root.



