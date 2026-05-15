// Stepper.jsx
// Shows the row of numbered steps at the top of the wizard card.
// Each step can be: pending (grey), active (blue), or completed (green tick image).

import React from 'react'

// The success image shown inside a completed step circle
const TICK_IMAGE = 'https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png'

// The list of steps in order
const STEPS = [
  { id: 0, displayText: 'Your Details'       },
  { id: 1, displayText: 'Date Selection'     },
  { id: 2, displayText: 'Guests'             },
  { id: 3, displayText: 'Travel Assistance'  },
  { id: 4, displayText: 'Confirmation'       },
]

// activeStep is a number (0–4) passed in from TravelTripPage
function Stepper({ activeStep }) {
  return (
    <div className="stepper">
      {STEPS.map(function(step) {
        const isActive    = step.id === activeStep       // currently on this step
        const isCompleted = step.id <  activeStep        // already done this step

        // Build the CSS class string for the step-item wrapper
        let itemClass = 'step-item'
        if (isActive)    itemClass = itemClass + ' active'
        if (isCompleted) itemClass = itemClass + ' completed'

        // Build the CSS class for the circle
        let circleClass = 'step-circle'
        if (isActive)    circleClass = circleClass + ' active'
        if (isCompleted) circleClass = circleClass + ' completed'

        return (
          <div key={step.id} className={itemClass}>
            <div className={circleClass}>
              {/* Completed → show green tick image */}
              {isCompleted ? (
                <img src={TICK_IMAGE} alt={step.displayText} />
              ) : (
                /* Not completed → show the step number */
                <span className="step-number">{step.id + 1}</span>
              )}
            </div>
            {/* Step name below the circle */}
            <span className="step-label">{step.displayText}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Stepper
