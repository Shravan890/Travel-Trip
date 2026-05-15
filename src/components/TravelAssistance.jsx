// TravelAssistance.jsx  (Step 4)
// Shows a checkbox: "Travel Assistance Needed"
// If checked → a dropdown appears to pick the type of assistance
// Props:
//   data   → saved assistance info so "Previous" restores it
//   onNext → called with { assistanceNeeded, assistanceType }
//   onPrev → goes back to Guests

import React, { useState } from 'react'

// Options available in the dropdown
const ASSISTANCE_OPTIONS = [
  'Airport Transfer',
  'Hotel Booking',
  'Tour Guide',
  'Travel Insurance',
  'Visa Assistance',
  'Currency Exchange',
]

function TravelAssistance({ data, onNext, onPrev }) {
  // Whether the checkbox is ticked
  const [needed, setNeeded] = useState(data.assistanceNeeded || false)
  // Which option is selected in the dropdown
  const [type,   setType]   = useState(data.assistanceType   || ASSISTANCE_OPTIONS[0])

  function handleNext() {
    onNext({
      assistanceNeeded: needed,
      // Only save the type if assistance is actually needed
      assistanceType: needed ? type : '',
    })
  }

  return (
    <div>
      <h2 className="wizard-title">Travel Assistance</h2>
      <p className="wizard-subtitle">Would you like help during your journey?</p>
      <div className="wizard-divider"></div>

      <div className="assistance-area">

        {/* Checkbox row */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={needed}
            onChange={function(e) { setNeeded(e.target.checked) }}
          />
          <span>Travel Assistance Needed</span>
        </label>

        {/* Dropdown — only shows when the checkbox is ticked */}
        {needed && (
          <div>
            <p className="assistance-dropdown-label">Type of Assistance</p>
            <select
              className="assistance-select"
              value={type}
              onChange={function(e) { setType(e.target.value) }}
            >
              {ASSISTANCE_OPTIONS.map(function(option) {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              })}
            </select>
          </div>
        )}

      </div>

      <div className="wizard-actions">
        <button className="btn-prev" onClick={onPrev}>← Previous</button>
        <button className="btn-next" onClick={handleNext}>Next →</button>
      </div>
    </div>
  )
}

export default TravelAssistance
