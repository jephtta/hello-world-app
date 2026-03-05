# Hello World App

A minimal Next.js application that displays a centered "Hello World" heading.
Built with Next.js, React, TypeScript, Tailwind CSS, and Firebase, deployed on Google Cloud Run.

**Live URL:** https://hello-world-app-443521829717.us-east1.run.app

## Prerequisites

- Node.js 22+
- A Firebase project (for Firestore configuration)
- Google Cloud account (for Cloud Run deployment)

## Local Setup

```bash
# Clone the repository
git clone https://github.com/jephtta/hello-world-app.git
cd hello-world-app

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Fill in your Firebase config values (see Environment Variables below)

# Start dev server
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment Variables

Create a `.env.local` file with the following:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key (Firebase Console > Project Settings) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain (`<project-id>.firebaseapp.com`) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket (`<project-id>.appspot.com`) |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |

## Running Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Run all tests
npx playwright test

# Run with UI
npx playwright test --ui
```

There are 10 tests across two suites:
- **e2e/hello-world.spec.ts** — 6 functional tests (heading, centering, title, meta, JS errors, 404)
- **e2e/smoke.spec.ts** — 4 smoke tests (HTTP 200, rendering, title, content type)

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start

# Docker build
docker build -t hello-world-app .
docker run -p 3000:3000 hello-world-app
```

Deployed to Google Cloud Run via Docker container with standalone Next.js output.
