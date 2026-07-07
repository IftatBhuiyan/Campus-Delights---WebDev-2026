import React from 'react'
import { isSpotOpen } from '../utils/foodSpotHelpers'
import './OpenStatus.css'

function OpenStatus({ hours }) {
  const isOpen = isSpotOpen(hours)

  return (
    <span className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? 'Open Now' : 'Closed'}
    </span>
  )
}

export default OpenStatus