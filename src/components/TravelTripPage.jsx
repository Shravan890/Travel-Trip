// TravelTripPage.jsx
// This is the main page that only logged-in users can see (protected route).
// It contains:
//   1. A header bar with the user's name and a sign-out button
//   2. The Stepper (progress bar)
//   3. The current wizard step (one of 5 forms)
//   4. After confirming → shows the Confirmed screen

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './App'

import Stepper          from './Stepper'
import YourDetails      from './YourDetails'
import DateSelection    from './DateSelection'
import Guests           from './Guests'
import TravelAssistance from './TravelAssistance'
import Confirmation     from './Confirmation'
import Confirmed        from './Confirmed'

// The starting (empty) form data for all steps
// We store everything in ONE object so it's easy to pass to Confirmation
const EMPTY_FORM = {
  details: {
    name: '', startLocation: '', endLocation: '',
  },
  dates: {
    startDate: '', endDate: '',
  },
  guests: {
    adults: 1, children: 0, infants: 0,
  },
  assistance: {
    assistanceNeeded: false, assistanceType: '',
  },
}

function TravelTripPage() {
  const navigate      = useNavigate()
  const { user, logout } = useAuth()

  // Which step we are on: 0 = YourDetails, 1 = DateSelection, etc.
  const [currentStep, setCurrentStep] = useState(0)

  // Whether the booking has been confirmed (shows Confirmed screen)
  const [isConfirmed, setIsConfirmed] = useState(false)

  // All collected form data — updated step by step
  const [formData, setFormData] = useState(EMPTY_FORM)

  // ── Sign out ──────────────────────────────────
  function handleSignOut() {
    logout()
    navigate('/login')
  }

  // ── Step 1 → Step 2 ──────────────────────────
  // "data" is { name, startLocation, endLocation }
  function handleDetailsNext(data) {
    // Save to formData, then go to next step
    setFormData(function(prev) { return { ...prev, details: data } })
    setCurrentStep(1)
  }

  // ── Step 2 → Step 3 ──────────────────────────
  function handleDatesNext(data) {
    setFormData(function(prev) { return { ...prev, dates: data } })
    setCurrentStep(2)
  }

  // ── Step 3 → Step 4 ──────────────────────────
  function handleGuestsNext(data) {
    setFormData(function(prev) { return { ...prev, guests: data } })
    setCurrentStep(3)
  }

  // ── Step 4 → Step 5 ──────────────────────────
  function handleAssistanceNext(data) {
    setFormData(function(prev) { return { ...prev, assistance: data } })
    setCurrentStep(4)
  }

  // ── Confirm booking ───────────────────────────
  function handleConfirm() {
    setIsConfirmed(true)
  }

  // ── Cancel → go all the way back to Step 1 ───
  function handleCancel() {
    setFormData(EMPTY_FORM)
    setCurrentStep(0)
    setIsConfirmed(false)
  }

  // ── Book New Trip → same as cancel ───────────
  function handleNewTrip() {
    setFormData(EMPTY_FORM)
    setCurrentStep(0)
    setIsConfirmed(false)
  }

  // Decide which step component to show
  function renderCurrentStep() {
    // If booking confirmed, skip the wizard and show success screen
    if (isConfirmed) {
      return <Confirmed onNewTrip={handleNewTrip} />
    }

    // Otherwise pick the step by number
    if (currentStep === 0) {
      return (
        <YourDetails
          data={formData.details}
          onNext={handleDetailsNext}
        />
      )
    }

    if (currentStep === 1) {
      return (
        <DateSelection
          data={formData.dates}
          onNext={handleDatesNext}
          onPrev={function() { setCurrentStep(0) }}
        />
      )
    }

    if (currentStep === 2) {
      return (
        <Guests
          data={formData.guests}
          onNext={handleGuestsNext}
          onPrev={function() { setCurrentStep(1) }}
        />
      )
    }

    if (currentStep === 3) {
      return (
        <TravelAssistance
          data={formData.assistance}
          onNext={handleAssistanceNext}
          onPrev={function() { setCurrentStep(2) }}
        />
      )
    }

    if (currentStep === 4) {
      return (
        <Confirmation
          formData={formData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )
    }

    return null
  }

  return (
    <div>

      {/* ── Top header bar ── */}
      <header className="trip-header">
        <div className="header-brand">
          <span>✈️</span> TravelTrip
        </div>
        <div className="header-right">
          <span className="header-user-text">
            Welcome, <strong>{user.name}</strong>
          </span>
          <button className="btn-signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Main content area ── */}
      <div className="trip-main">
        <div className="wizard-card">

          {/* Show the stepper only while filling in the form (not on success screen) */}
          {!isConfirmed && <Stepper activeStep={currentStep} />}

          {/* The form for the current step */}
          <div className="wizard-body">
            {renderCurrentStep()}
          </div>

        </div>
      </div>

    </div>
  )
}

export default TravelTripPage
