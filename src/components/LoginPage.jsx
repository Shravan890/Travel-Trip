// LoginPage.jsx
// Shows a login form with Email + Password fields.
// On success → navigates to /trip
// On fail    → shows an error message from AuthContext

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './App'   // our custom hook from App.jsx

function LoginPage() {
  // useNavigate lets us redirect the user to another page
  const navigate = useNavigate()

  // Get login function and any error message from AuthContext
  const { login, authError, clearError } = useAuth()

  // Local state for what the user types
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  // Local field-level validation errors (e.g. "Email is required")
  const [errors, setErrors] = useState({ email: '', password: '' })

  // Called when the user clicks "Sign In"
  function handleSubmit(event) {
    // Prevent the browser from refreshing the page
    event.preventDefault()

    // Clear previous errors
    clearError()

    // Simple validation
    const newErrors = { email: '', password: '' }
    if (email.trim() === '') {
      newErrors.email = 'Email is required'
    } else if (!email.includes('@')) {
      newErrors.email = 'Enter a valid email address'
    }
    if (password === '') {
      newErrors.password = 'Password is required'
    }

    // If there are errors, show them and stop
    if (newErrors.email !== '' || newErrors.password !== '') {
      setErrors(newErrors)
      return
    }

    // Try to log in using the AuthContext login function
    const success = login(email, password)

    if (success) {
      // Redirect to the trip planning page
      navigate('/trip')
    }
    // If not success, authError in AuthContext is set automatically
    // and the red banner below will show
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Brand logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">✈️</div>
          <h1>TravelTrip</h1>
          <p>Your journey starts here</p>
        </div>

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to plan your next adventure</p>

        {/* Show error from AuthContext (wrong email/password) */}
        {authError !== '' && (
          <div className="auth-error-banner">{authError}</div>
        )}

        {/* Login form */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Email field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className={errors.email !== '' ? 'form-input has-error' : 'form-input'}
              placeholder="you@example.com"
              value={email}
              onChange={function(e) {
                setEmail(e.target.value)
                // Clear the error as the user starts typing
                setErrors(function(prev) { return { ...prev, email: '' } })
                clearError()
              }}
            />
            {/* Show the error text only if there is one */}
            {errors.email !== '' && (
              <span className="field-error-text">{errors.email}</span>
            )}
          </div>

          {/* Password field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={errors.password !== '' ? 'form-input has-error' : 'form-input'}
              placeholder="Enter your password"
              value={password}
              onChange={function(e) {
                setPassword(e.target.value)
                setErrors(function(prev) { return { ...prev, password: '' } })
                clearError()
              }}
            />
            {errors.password !== '' && (
              <span className="field-error-text">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>

        {/* Link to Register page */}
        <div className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>

        {/* Demo hint box */}
        <div className="auth-demo-hint">
          <strong>Demo accounts to try:</strong><br />
          alice@travel.com &nbsp;/&nbsp; alice123<br />
          bob@travel.com &nbsp;/&nbsp; bob123
        </div>

      </div>
    </div>
  )
}

export default LoginPage
