// App.jsx
// This is the ROOT component of the app.
// It sets up:
//   1. AuthContext  - so every page can read the logged-in user
//   2. Routes      - decides which page to show based on the URL

import React, { useState, createContext, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import TravelTripPage from './TravelTripPage'
import NotFoundPage from './NotFoundPage'

// ─────────────────────────────────────────────
// 1. AUTH CONTEXT
// createContext creates a "shared box" that any
// child component can read from using useContext.
// ─────────────────────────────────────────────

// This is the shared box
export const AuthContext = createContext(null)

// This is a custom hook so components can easily
// get data from the box: const { user } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}

// Demo users stored in memory (no real backend needed)
// In a real app these would be stored in a database
const DEMO_USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@travel.com', password: 'alice123' },
  { id: 2, name: 'Bob Smith',     email: 'bob@travel.com',   password: 'bob123'   },
]

// ─────────────────────────────────────────────
// 2. PROTECTED ROUTE
// If the user is NOT logged in and tries to go
// to /trip, redirect them to /login instead.
// ─────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { user } = useAuth()

  // user is null  → not logged in → send to login
  // user has data → logged in     → show the page
  if (user === null) {
    return <Navigate to="/login" replace />
  }
  return children
}

// ─────────────────────────────────────────────
// 3. APP COMPONENT
// ─────────────────────────────────────────────
function App() {
  // user state: null means "not logged in"
  // When someone logs in we store their info here
  const [user, setUser]       = useState(null)
  const [authError, setAuthError] = useState('')

  // LOGIN function
  // Checks email + password against DEMO_USERS list
  function login(email, password) {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      // Remove password before storing (security best practice)
      const safeUser = { id: found.id, name: found.name, email: found.email }
      setUser(safeUser)
      setAuthError('')
      return true   // login success
    }
    setAuthError('Wrong email or password. Please try again.')
    return false    // login failed
  }

  // REGISTER function
  // Adds a new user to the DEMO_USERS list
  function register(name, email, password) {
    // Check if this email is already taken
    const alreadyExists = DEMO_USERS.find((u) => u.email === email)
    if (alreadyExists) {
      setAuthError('An account with this email already exists.')
      return false
    }
    // Create new user object
    const newUser = { id: Date.now(), name: name, email: email, password: password }
    DEMO_USERS.push(newUser)

    // Log in automatically after registering
    const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(safeUser)
    setAuthError('')
    return true
  }

  // LOGOUT function
  function logout() {
    setUser(null)
  }

  // Clear any error message
  function clearError() {
    setAuthError('')
  }

  // The "value" object is what all child components can read
  const authValue = {
    user,
    authError,
    login,
    register,
    logout,
    clearError,
  }

  return (
    // AuthContext.Provider wraps everything so all pages
    // can access user info and auth functions
    <AuthContext.Provider value={authValue}>
      <Routes>
        {/* / → redirect to login page */}
        <Route path="/"         element={<Navigate to="/login" replace />} />

        {/* /login → show the Login page */}
        <Route path="/login"    element={<LoginPage />} />

        {/* /register → show the Register page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* /trip → show Trip page ONLY if logged in */}
        <Route
          path="/trip"
          element={
            <ProtectedRoute>
              <TravelTripPage />
            </ProtectedRoute>
          }
        />

        {/* anything else → 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
