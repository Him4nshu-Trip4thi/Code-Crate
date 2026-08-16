# Demo — Code Crate (Local)

This file lists quick commands and expected outputs for demonstrating the app locally.

Prerequisites
- Node.js v20+
- MongoDB running locally (default URI: `mongodb://127.0.0.1:27017/codecrate`)

Install
```bash
npm --prefix backend-main install
npm --prefix frontend-main install
```

Start
```bash
# backend (starts on 3000)
npm --prefix backend-main run start

# frontend (Vite) - may pick next free port e.g. 5173, 5174, 5175
npm --prefix frontend-main run dev
```

Smoke tests
```bash
# signup and login
node tmp_e2e.js
# create a repo for the first user returned by backend
node tmp_create_repo.js
```

Manual demo flow (UI)
1. Open the frontend dev URL (printed by Vite, e.g. `http://localhost:5175/`).
2. Landing page has `Get Started` (goes to `/auth`) and `Preview App` (goes to `/app`).
3. Signup or Login; after success you should land in the Dashboard (`/app`).
4. Use `Create` in the navbar to create a new repository.

Developer notes
- CLI: use the backend CLI via `node index.js <command>` or `npm run start` (calls `node index.js start`). Commands supported: `start`, `init`, `add <file>`, `commit <message>`, `push`, `pull`, `revert <commitID>`.
- API base: `http://localhost:3000` (change via `VITE_API_URL` in frontend environment).

Expected outputs
- `tmp_e2e.js` prints `Signup status 200` and `Login status 200` with JWT and userId JSON.
- `tmp_create_repo.js` prints `Create status 201` and the created repository ID.

If anything fails, check backend logs (console) for errors and confirm MongoDB is reachable.
