// DateSelection.jsx  (Step 2)
// Collects: Start Date, End Date
// Props:
//   data   → saved dates so "Previous" restores them
//   onNext → called with { startDate, endDate } when valid
//   onPrev → called when Previous is clicked

import React, { useState } from 'react'

function DateSelection({ data, onNext, onPrev }) {
  const [startDate, setStartDate] = useState(data.startDate || '')
  const [endDate,   setEndDate]   = useState(data.endDate   || '')
  const [errors,    setErrors]    = useState({ startDate: '', endDate: '' })

  function handleNext() {
    const newErrors = { startDate: '', endDate: '' }

    if (startDate === '') {
      newErrors.startDate = 'Select start date'
    }
    if (endDate === '') {
      newErrors.endDate = 'Select end date'
    } else if (startDate !== '' && endDate < startDate) {
      // Compare date strings directly — works because format is YYYY-MM-DD
      newErrors.endDate = 'The end date cannot be less than the start date'
    }

    const hasError = Object.values(newErrors).some(function(e) { return e !== '' })
    if (hasError) {
      setErrors(newErrors)
      return
    }

    onNext({ startDate: startDate, endDate: endDate })
  }

  return (
    <div>
      <h2 className="wizard-title">Date Selection</h2>
      <p className="wizard-subtitle">When is your trip? Choose your travel dates</p>
      <div className="wizard-divider"></div>

      <div className="field-group">

        {/* Start Date */}
        <div className="field">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            className={errors.startDate !== '' ? 'field-input has-error' : 'field-input'}
            value={startDate}
            onChange={function(e) {
              setStartDate(e.target.value)
              setErrors(function(prev) { return { ...prev, startDate: '' } })
            }}
          />
          {errors.startDate !== '' && (
            <span className="field-error-text">{errors.startDate}</span>
          )}
        </div>

        {/* End Date */}
        <div className="field">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            className={errors.endDate !== '' ? 'field-input has-error' : 'field-input'}
            value={endDate}
            onChange={function(e) {
              setEndDate(e.target.value)
              setErrors(function(prev) { return { ...prev, endDate: '' } })
            }}
          />
          {errors.endDate !== '' && (
            <span className="field-error-text">{errors.endDate}</span>
          )}
        </div>

      </div>

      <div className="wizard-actions">
        <button className="btn-prev" onClick={onPrev}>← Previous</button>
        <button className="btn-next" onClick={handleNext}>Next →</button>
      </div>
    </div>
  )
}

export default DateSelection
