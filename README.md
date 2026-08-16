# Code-Crate

What is CodeCrate?

CodeCrate is a lightweight developer platform prototype that models repository management, issues, and user profiles. It contains a Node/Express backend and a React + Vite frontend.

Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React, Vite
- Auth: JWT, bcrypt

Local setup (quick)

1. Install dependencies for backend and frontend:

```powershell
cd backend-main
npm install
cd ../frontend-main
npm install
```

2. Create environment files:

- Copy `backend-main/.env.example` to `backend-main/.env` and set `MONGODB_URI` and `JWT_SECRET_KEY`.
- Copy `frontend-main/.env.example` to `frontend-main/.env` if you need to override API URL.

3. Start services (run in separate terminals):

Backend:

```powershell
npm --prefix backend-main run start
```

Frontend:

```powershell
npm --prefix frontend-main run dev
```

4. Open the app:

- Frontend: http://localhost:5173/
- Backend health: http://localhost:3000/

API notes

- The frontend reads API base from `VITE_API_URL` (defaults to `http://localhost:3000`).

Security & notes

- Do not commit real secrets. Use `.env` files locally and set secure `JWT_SECRET_KEY` in production.
