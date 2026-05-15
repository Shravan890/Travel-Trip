// Confirmed.jsx
// The success screen shown after the user clicks "Confirm Booking".
// Shows a tick image, a congratulations message, and a "Book New Trip" button.
// Props:
//   onNewTrip → called when "Book New Trip" is clicked (resets everything)

import React from 'react'

const SUCCESS_IMAGE = 'https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png'

function Confirmed({ onNewTrip }) {
  return (
    <div className="confirmed-screen">

      {/* Big tick image — alt must be "success" as per project spec */}
      <img
        src={SUCCESS_IMAGE}
        alt="success"
        className="confirmed-image"
      />

      <h2 className="confirmed-title">Booking Confirmed! 🎉</h2>

      <p className="confirmed-subtitle">
        Your trip has been successfully booked. Get ready for an amazing adventure!
      </p>

      {/* Click this to start over and plan a new trip */}
      <button className="btn-new-trip" onClick={onNewTrip}>
        ✈️ Book New Trip
      </button>

    </div>
  )
}

export default Confirmed
