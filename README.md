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

Iftat - Designed and Created basic outline and strucure for the Repo, Further refined and modified the Landing page.

Mehrub - [Type Here]

Raissa - [Type Here]

Katherin - Assisted in UI images and hero background feel, created an intake form to allow for user suggestions/updates to food spots, and a system for overlooking user requests for team approval
