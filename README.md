# Exe-Tracker

Exe-Tracker is a MERN exercise log app. Users can be created, exercise entries can be added, edited, deleted, and listed in one shared table.

## Stack

- React 19, React Router 7, Vite, and Bootstrap 5 on the frontend
- Node 20.19+, Express 5, and Mongoose 9 on the backend
- MongoDB for persistence
- Vitest for frontend test execution

## Local Setup

1. Use Node 20.19.0 or newer.

2. Install dependencies:

	```sh
	npm install
	npm run install-client
	```

3. Create a `.env` file in the project root:

	```sh
	ATLAS_URI=your_mongodb_connection_string
	CLIENT_ORIGIN=http://localhost:3000
	```

4. Start the app:

	```sh
	npm run dev
	```

The API runs on `http://localhost:5000` and the Vite dev server runs on `http://localhost:3000`.

## Configuration

- `ATLAS_URI` is required by the Express server and should contain your MongoDB connection string.
- `CLIENT_ORIGIN` controls the allowed browser origin for CORS during local development. It defaults to `http://localhost:3000`.
- `VITE_API_ROOT` can be added to `client/.env` if the frontend should call a custom API origin. In production, the client defaults to same-origin API requests.

## Scripts

- `npm start` starts the Express server.
- `npm run client` starts the Vite client.
- `npm run dev` starts both the server and client.
- `npm run build` builds the client into `client/build` for production serving by Express.
- `npm test` runs Vitest once. It passes when no test files exist.
- `npm --prefix client run preview` previews the production client build locally.

## Production Notes

Run `npm run build` before deploying. When `NODE_ENV=production`, Express serves `client/build` and falls back to `index.html` for client-side routes.

Created by Abhishek Singh: https://github.com/asrgabreo
