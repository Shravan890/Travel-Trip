# ✈️ Travel Trip App

A multi-step trip booking wizard built with React + React Router.

## Features
- **Authentication** — Login & Register (with demo accounts)
- **Protected Routes** — only logged-in users reach the trip wizard
- **5-Step Wizard** — Your Details → Date Selection → Guests → Travel Assistance → Confirmation
- **Validation** — every step validates inputs before proceeding
- **Fully styled** — custom CSS, no third-party UI library

## Demo Accounts
| Email | Password |
|-------|----------|
| alice@travel.com | alice123 |
| bob@travel.com | bob123 |

## Run Locally
```bash
npm install
npm run dev
```

## Deploy to Netlify (drag & drop or GitHub)
1. Push this folder to GitHub
2. Go to https://app.netlify.com → "Add new site" → "Import from Git"
3. Build command: `npm run build`  
4. Publish directory: `dist`
5. Click Deploy ✅

## Deploy to Vercel
```bash
npx vercel
```

## Project Structure
```
src/
└── components/
    ├── App.jsx              ← Root: AuthContext + Routes
    ├── App.css              ← All styles (one file)
    ├── LoginPage.jsx
    ├── RegisterPage.jsx
    ├── TravelTripPage.jsx   ← Protected page, wizard logic
    ├── Stepper.jsx          ← Step progress bar
    ├── YourDetails.jsx      ← Step 1
    ├── DateSelection.jsx    ← Step 2
    ├── Guests.jsx           ← Step 3
    ├── TravelAssistance.jsx ← Step 4
    ├── Confirmation.jsx     ← Step 5
    ├── Confirmed.jsx        ← Success screen
    └── NotFoundPage.jsx     ← 404
```
