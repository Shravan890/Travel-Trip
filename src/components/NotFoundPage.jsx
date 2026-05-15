// NotFoundPage.jsx
// Shown when the user visits a URL that doesn't exist (e.g. /blah)

import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Oops! This page doesn't exist.</p>
      <Link to="/login">← Go back to Login</Link>
    </div>
  )
}

export default NotFoundPage
