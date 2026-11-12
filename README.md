# Small Web Browser Project

This project is a small browser-like web app with a NestJS backend and a MongoDB-backed data layer.

It includes:
- person browsing flow
- search results
- site history and navigation
- publish a site form
- sanitized HTML rendering
- small-web style browsing experience

## Tech Stack

- Frontend: Next.js
- Backend: NestJS
- Database: MongoDB
- Language: TypeScript

## Prerequisites

- Node.js and npm
- Docker

## Start MongoDB

```bash
docker run -d --name technical-assessment-mongo -p 27017:27017 mongo:7
```

## Install and Run the Server

```bash
cd server
npm install
npm run seed
npm run start:dev
```

## Install and Run the Web App

```bash
cd web
npm install
npm run dev
```

## Access the App

Open:

```text
http://localhost:3000
```

## Notes

- The frontend runs on port 3000.
- The backend runs on port 4000 by default.
- Seed data is required before using the app for the first time.
- The server connects to MongoDB at localhost:27017.
