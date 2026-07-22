# Major Project Setup

This project has two separate apps:

- `Backend`: Express + MongoDB API
- `Frontend/majorProject`: React + Vite frontend

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- A reachable MongoDB database

## Backend setup

1. Open `Backend`.
2. Create `.env` from `.env.example`.
3. Set `MONGODB` to your MongoDB connection string.
4. Optionally change `PORT` if `3000` is already in use.
5. Install dependencies:

   ```bash
   npm install
   ```

6. Seed products once:

   ```bash
   npm run seed
   ```

7. Start the backend:

   ```bash
   npm run dev
   ```

## Frontend setup

1. Open `Frontend/majorProject`.
2. Create `.env` from `.env.example`.
3. Set `VITE_API_BASE_URL` to your backend URL. For local development use `http://localhost:3000`.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the frontend:

   ```bash
   npm run dev
   ```

## Run order

1. Start the backend first.
2. Start the frontend.
3. Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Notes

- Product data is loaded into MongoDB by `npm run seed`.
- The frontend now reads the backend base URL from `VITE_API_BASE_URL`, so you do not need to edit source files when the backend host changes.
- On Windows, reopen the terminal after installing Node.js so `node` and `npm` are added to PATH.
- If PowerShell blocks `npm` with an execution-policy error, use `npm.cmd` instead or run the commands from Command Prompt.