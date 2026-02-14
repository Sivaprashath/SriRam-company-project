# Wardrobe Manager API

Express backend for the cloth inventory app. Data is stored in **MongoDB**.

## Prerequisites

- **MongoDB** running locally (e.g. `mongodb://localhost:27017`) or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string.

## Setup

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and set your MongoDB URI:

```bash
cp .env.example .env
# Edit .env and set MONGODB_URI (e.g. mongodb://localhost:27017 or your Atlas URI)
```

## Run

```bash
npm start
```

Runs at **http://localhost:3001**. The server connects to MongoDB on startup; if the connection fails, the process exits with an error.

## Endpoints

- `POST /api/auth/login` — Body: `{ userId, password }` → `{ success, token }`
- `GET /api/dashboard/stats` → `{ todayInwards, todayOutwards, totalStockKgs, monthlyGrowthPercent }`
- `GET /api/cloth-inwards?limit=50&offset=0` — List inward records
- `POST /api/cloth-inwards` — Body: `{ formData, items }` — Create inward record
- `GET /api/cloth-outwards?limit=50&offset=0` — List outward records
- `POST /api/cloth-outwards` — Body: `{ formData, items }` — Create outward record

Default login: **admin** / **1234**.
