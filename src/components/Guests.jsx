// Guests.jsx  (Step 3)
// Shows counters for Adults, Children, Infants
// Adults start at 1 (minimum 1), Children & Infants start at 0 (minimum 0)
// Props:
//   data   → saved counts so "Previous" restores them
//   onNext → called with { adults, children, infants }
//   onPrev → goes back to DateSelection

import React, { useState } from 'react'

// The three types of guests with their rules
const GUEST_TYPES = [
  { key: 'adults',   label: 'Adults',   description: 'Ages 13 and above', min: 1 },
  { key: 'children', label: 'Children', description: 'Ages 2 – 12',       min: 0 },
  { key: 'infants',  label: 'Infants',  description: 'Under 2 years',     min: 0 },
]

function Guests({ data, onNext, onPrev }) {
  // State holds all three counts in one object
  const [counts, setCounts] = useState({
    adults:   data.adults   !== undefined ? data.adults   : 1,
    children: data.children !== undefined ? data.children : 0,
    infants:  data.infants  !== undefined ? data.infants  : 0,
  })

  // Increase a count by 1
  function increment(key) {
    setCounts(function(prev) {
      return { ...prev, [key]: prev[key] + 1 }
    })
  }

  // Decrease a count by 1, but never go below the minimum
  function decrement(key, min) {
    setCounts(function(prev) {
      const newValue = prev[key] - 1
      // Math.max ensures we never go below the minimum
      return { ...prev, [key]: Math.max(min, newValue) }
    })
  }

  function handleNext() {
    // No validation needed here — counts have enforced minimums
    onNext(counts)
  }

  return (
    <div>
      <h2 className="wizard-title">Guests</h2>
      <p className="wizard-subtitle">How many travellers are joining?</p>
      <div className="wizard-divider"></div>

      <div className="guests-list">
        {/* Loop through each guest type and render a row */}
        {GUEST_TYPES.map(function(guest) {
          return (
            <div key={guest.key} className="guest-row">
              {/* Left side: label and age description */}
              <div className="guest-info">
                <h3>{guest.label}</h3>
                <p>{guest.description}</p>
              </div>

              {/* Right side: − number + buttons */}
              <div className="guest-counter">
                <button
                  className="counter-btn"
                  onClick={function() { decrement(guest.key, guest.min) }}
                  disabled={counts[guest.key] <= guest.min}
                >
                  −
                </button>

                <span className="counter-number">{counts[guest.key]}</span>

                <button
                  className="counter-btn"
                  onClick={function() { increment(guest.key) }}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="wizard-actions">
        <button className="btn-prev" onClick={onPrev}>← Previous</button>
        <button className="btn-next" onClick={handleNext}>Next →</button>
      </div>
    </div>
  )
}

export default Guests
