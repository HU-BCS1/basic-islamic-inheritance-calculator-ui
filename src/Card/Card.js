import React from 'react'
import './Card.css'

const Card = ({ children, className }) => (
  <div className={`Card ${className}`}>{children}</div>
)

export default Card