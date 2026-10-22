# OnCampus

A simple web scraping app: a React UI on top of a Node.js scraping API.

```
OnCampus/
├── frontend/   React + Vite UI (port 5173)
└── backend/    Node.js + Express scraping API (port 3001)
```

## Getting started

Requires Node.js 20 or newer.

Start the backend in one terminal:

```bash
cd backend
npm install
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The Vite dev server forwards `/api` requests to the backend.

## API

| Method | Path                      | Description                                     |
| ------ | ------------------------- | ----------------------------------------------- |
| GET    | `/api/health`             | Health check                                    |
| GET    | `/api/scrape?url=<url>`   | Returns the page's title, description, headings and links |
