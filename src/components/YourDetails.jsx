// YourDetails.jsx  (Step 1)
// Collects: Name, Start Location, End Location
// Props:
//   data   → current saved values (so going back restores them)
//   onNext → function to call when Next is clicked (passes data up)

import React, { useState } from 'react'

function YourDetails({ data, onNext }) {
  // Pre-fill with whatever was saved before (empty string if first time)
  const [name,          setName]          = useState(data.name          || '')
  const [startLocation, setStartLocation] = useState(data.startLocation || '')
  const [endLocation,   setEndLocation]   = useState(data.endLocation   || '')

  // Validation error messages for each field
  const [errors, setErrors] = useState({ name: '', startLocation: '', endLocation: '' })

  function handleNext() {
    // Build an errors object
    const newErrors = { name: '', startLocation: '', endLocation: '' }

    if (name.trim() === '')          newErrors.name          = 'Enter your name'
    if (startLocation.trim() === '') newErrors.startLocation = 'Enter your start location'
    if (endLocation.trim() === '')   newErrors.endLocation   = 'Enter your end location'

    // If any error exists, show them and stop
    const hasError = Object.values(newErrors).some(function(e) { return e !== '' })
    if (hasError) {
      setErrors(newErrors)
      return
    }

    // All good → send data to parent (TravelTripPage)
    onNext({
      name:          name.trim(),
      startLocation: startLocation.trim(),
      endLocation:   endLocation.trim(),
    })
  }

  return (
    <div>
      <h2 className="wizard-title">Your Details</h2>
      <p className="wizard-subtitle">Tell us a bit about yourself to get started</p>
      <div className="wizard-divider"></div>

      <div className="field-group">

        {/* Name */}
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className={errors.name !== '' ? 'field-input has-error' : 'field-input'}
            placeholder="Enter your name"
            value={name}
            onChange={function(e) {
              setName(e.target.value)
              setErrors(function(prev) { return { ...prev, name: '' } })
            }}
          />
          {errors.name !== '' && <span className="field-error-text">{errors.name}</span>}
        </div>

        {/* Start Location */}
        <div className="field">
          <label htmlFor="startLocation">Start Location</label>
          <input
            id="startLocation"
            type="text"
            className={errors.startLocation !== '' ? 'field-input has-error' : 'field-input'}
            placeholder="Where are you departing from?"
            value={startLocation}
            onChange={function(e) {
              setStartLocation(e.target.value)
              setErrors(function(prev) { return { ...prev, startLocation: '' } })
            }}
          />
          {errors.startLocation !== '' && (
            <span className="field-error-text">{errors.startLocation}</span>
          )}
        </div>

        {/* End Location */}
        <div className="field">
          <label htmlFor="endLocation">End Location</label>
          <input
            id="endLocation"
            type="text"
            className={errors.endLocation !== '' ? 'field-input has-error' : 'field-input'}
            placeholder="Where are you going?"
            value={endLocation}
            onChange={function(e) {
              setEndLocation(e.target.value)
              setErrors(function(prev) { return { ...prev, endLocation: '' } })
            }}
          />
          {errors.endLocation !== '' && (
            <span className="field-error-text">{errors.endLocation}</span>
          )}
        </div>

      </div>

      {/* Only "Next" button on the first step (no Previous) */}
      <div className="wizard-actions">
        <button className="btn-next" onClick={handleNext}>Next →</button>
      </div>
    </div>
  )
}

export default YourDetails
