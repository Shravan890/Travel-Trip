// Confirmation.jsx  (Step 5)
// Displays a summary of all the data from previous steps.
// Two buttons:
//   Cancel  → resets everything and goes back to step 1
//   Confirm → shows the success screen

import React from 'react'

// Helper: turns "2024-05-20" into "20 May 2024"
function formatDate(dateString) {
  if (!dateString) return '—'
  // Adding T00:00:00 prevents timezone issues
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

// Props:
//   formData  → object with details, dates, guests, assistance
//   onConfirm → called when "Confirm Booking" is clicked
//   onCancel  → called when "Cancel" is clicked
function Confirmation({ formData, onConfirm, onCancel }) {
  // Pull each section out of formData for easier reading
  const details    = formData.details
  const dates      = formData.dates
  const guests     = formData.guests
  const assistance = formData.assistance

  return (
    <div>
      <h2 className="wizard-title">Confirmation</h2>
      <p className="wizard-subtitle">Review your trip details before confirming</p>
      <div className="wizard-divider"></div>

      <div className="confirmation-list">

        {/* ── Your Details card ── */}
        <div className="confirm-card">
          <div className="confirm-card-header">
            <span>👤</span>
            <h3>Your Details</h3>
          </div>
          <div className="confirm-card-body">
            <div className="confirm-item">
              <label>Name</label>
              <p>{details.name}</p>
            </div>
            <div className="confirm-item">
              <label>Start Location</label>
              <p>{details.startLocation}</p>
            </div>
            <div className="confirm-item">
              <label>End Location</label>
              <p>{details.endLocation}</p>
            </div>
          </div>
        </div>

        {/* ── Date Selection card ── */}
        <div className="confirm-card">
          <div className="confirm-card-header">
            <span>📅</span>
            <h3>Date Selection</h3>
          </div>
          <div className="confirm-card-body">
            <div className="confirm-item">
              <label>Start Date</label>
              <p>{formatDate(dates.startDate)}</p>
            </div>
            <div className="confirm-item">
              <label>End Date</label>
              <p>{formatDate(dates.endDate)}</p>
            </div>
          </div>
        </div>

        {/* ── Guests card ── */}
        <div className="confirm-card">
          <div className="confirm-card-header">
            <span>👥</span>
            <h3>Guests</h3>
          </div>
          <div className="confirm-card-body">
            <div className="confirm-item">
              <label>Adults</label>
              <p>{guests.adults}</p>
            </div>
            <div className="confirm-item">
              <label>Children</label>
              <p>{guests.children}</p>
            </div>
            <div className="confirm-item">
              <label>Infants</label>
              <p>{guests.infants}</p>
            </div>
          </div>
        </div>

        {/* ── Travel Assistance card ── */}
        <div className="confirm-card">
          <div className="confirm-card-header">
            <span>🛎️</span>
            <h3>Travel Assistance</h3>
          </div>
          <div className="confirm-card-body">
            <div className="confirm-item">
              <label>Assistance Needed</label>
              <p>{assistance.assistanceNeeded ? 'Yes' : 'No'}</p>
            </div>
            {/* Only show the type if assistance was requested */}
            {assistance.assistanceNeeded && (
              <div className="confirm-item">
                <label>Assistance Type</label>
                <p>{assistance.assistanceType}</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Cancel and Confirm buttons */}
      <div className="confirm-actions">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-confirm" onClick={onConfirm}>✓ Confirm Booking</button>
      </div>
    </div>
  )
}

export default Confirmation
