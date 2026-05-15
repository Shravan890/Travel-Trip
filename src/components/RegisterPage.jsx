// RegisterPage.jsx
// Shows a registration form: Name, Email, Password, Confirm Password.
// On success → automatically logs in and redirects to /trip

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './App'

function RegisterPage() {
  const navigate  = useNavigate()
  const { register, authError, clearError } = useAuth()

  // State for each input field
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')

  // Field-level validation errors
  const [errors, setErrors] = useState({
    name: '', email: '', password: '', confirm: '',
  })

  function handleSubmit(event) {
    event.preventDefault()
    clearError()

    // Validate all four fields
    const newErrors = { name: '', email: '', password: '', confirm: '' }

    if (name.trim() === '') {
      newErrors.name = 'Full name is required'
    }
    if (email.trim() === '') {
      newErrors.email = 'Email is required'
    } else if (!email.includes('@')) {
      newErrors.email = 'Enter a valid email address'
    }
    if (password === '') {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (confirm === '') {
      newErrors.confirm = 'Please confirm your password'
    } else if (confirm !== password) {
      newErrors.confirm = 'Passwords do not match'
    }

    // Stop if any error exists
    const hasError = Object.values(newErrors).some(function(e) { return e !== '' })
    if (hasError) {
      setErrors(newErrors)
      return
    }

    // Try to register the new user
    const success = register(name.trim(), email, password)
    if (success) {
      navigate('/trip')
    }
  }

  // Helper to clear a specific field error while the user types
  function clearFieldError(fieldName) {
    setErrors(function(prev) { return { ...prev, [fieldName]: '' } })
    clearError()
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

        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Join thousands of travellers exploring the world</p>

        {/* Error from AuthContext (e.g. email already taken) */}
        {authError !== '' && (
          <div className="auth-error-banner">{authError}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className={errors.name !== '' ? 'form-input has-error' : 'form-input'}
              placeholder="John Doe"
              value={name}
              onChange={function(e) { setName(e.target.value); clearFieldError('name') }}
            />
            {errors.name !== '' && <span className="field-error-text">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className={errors.email !== '' ? 'form-input has-error' : 'form-input'}
              placeholder="you@example.com"
              value={email}
              onChange={function(e) { setEmail(e.target.value); clearFieldError('email') }}
            />
            {errors.email !== '' && <span className="field-error-text">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={errors.password !== '' ? 'form-input has-error' : 'form-input'}
              placeholder="Minimum 6 characters"
              value={password}
              onChange={function(e) { setPassword(e.target.value); clearFieldError('password') }}
            />
            {errors.password !== '' && <span className="field-error-text">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={errors.confirm !== '' ? 'form-input has-error' : 'form-input'}
              placeholder="Re-enter your password"
              value={confirm}
              onChange={function(e) { setConfirm(e.target.value); clearFieldError('confirm') }}
            />
            {errors.confirm !== '' && <span className="field-error-text">{errors.confirm}</span>}
          </div>

          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>

      </div>
    </div>
  )
}

export default RegisterPage
