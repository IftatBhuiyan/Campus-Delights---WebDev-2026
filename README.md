# Project Name: Campus Delights

## Team Members

- Iftat
- Mehrab
- Raissa
- Katherin

## Description

A social marketplace web application for CUNY Hunter College students to discover, rate, and review food spots near campus. The app will help students quickly find affordable, convenient, and student-approved places to eat between classes.

Students will be able to browse nearby restaurants, cafés, food carts, and quick-service spots around Hunter College. Each food spot can include basic information such as name, location, cuisine type, price range, distance from campus, hours, and student ratings. Users can leave reviews, rate food spots, and share helpful details such as best menu items, affordability, wait time, portion size, and study-friendly atmosphere.

The goal is to make campus food discovery easier by collecting student-centered recommendations in one place instead of relying only on Google Maps, word of mouth, or scattered social media posts.

## Technologies Used

- React w/Vite, HTML, CSS
- JavaScript
- Node.js + Express
- MongoDB Atlas
- APIs authentication

## Installation

Clone the repository:
git clone <https://github.com/IftatBhuiyan/Campus-Delights---WebDev-2026.git>

Install dependencies:
npm install
npm create vite@latest

Run locally:
npm run dev

The food spots page loads data from the deployed API (`campus-delights-api.onrender.com`) by default via `.env.development`, so it should match GitHub Pages without running the backend yourself.

To run the full stack locally (optional):
1. Copy `server/.env.example` to `server/.env` and fill in your values
2. Use port `5001` if port `5000` is taken (common on macOS)
3. Create `.env.local` with `VITE_API_URL=http://localhost:5001`
4. In one terminal: `cd server && npm install && npm run seed && npm start`
5. In another: `npm run dev`

## Food spot suggestions & admin review

**Student flow**
1. Go to Contact (`#contact`)
2. Click **Submit Your Request!** and fill out the suggestion form
3. The submission is saved in MongoDB as `pending`

**Team review flow**
1. Go to `#admin` (link at the bottom of the Contact page)
2. Sign in with the admin username/password from `server/.env`
3. Review pending submissions, then **Approve** or **Reject**
4. Approved spots are published to the Food Spots page automatically

**Required server environment variables** (local `server/.env` and Render):
- `MONGO_URI`
- `JWT_SECRET` — long random string for admin sessions
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

After deploying the updated API to Render, add the three new admin variables in the Render dashboard.

## Features

Feature 1: Landing Page
Feature 2: Navigation Menu
Feature 3: Food Spots Search Bar
Feature 4: Food Spots Filters
Feature 5: Review/Comment Sections
Feature 6: Intake Suggestion Form

## Folder Structure

src/
api/
assets/
components/
data/
images/
pages/

## Deployment

http://localhost:5173/Campus-Delights---WebDev-2026/#home

## Contributions

Iftat - Set up the repo structure, landing page, and core app routing/navigation. Built the food spot detail modal, connected the Contact suggestion form to the backend, and implemented the admin review flow so the team can approve or reject student submissions. Also handled local dev setup, GitHub Pages integration, and wiring the About page into the app.

Mehrab - Built and deployed the full backend: Express API, MongoDB Atlas, FoodSpot data model, seed script, and Render hosting (`campus-delights-api.onrender.com`). Implemented food spot, review, photo upload, and report endpoints that connect the live frontend to the database.

Raissa - Led frontend work on the Food Spots experience and the About page, including search with autocomplete, budget/walk-time/open-now filters, spot cards and detail views, and the full About page with team info, how-it-works steps, stats, and FAQ.

Katherin - Shaped the app’s visual feel with hero background imagery and UI assets, and designed the Contact page plus the food spot suggestion intake form (modal layout, fields, and styling) so students can recommend new places for the team to review.
