import React from 'react'

export default ({ isUpper }) => (
    isUpper ? 
    <svg viewBox="0 40 500 40" preserveAspectRatio="none" className="wave" style={{ bottom: '-1px' }}>
        <path d="M0.00,70.00 C130.07,0.0 275.67,123.70 500.00,60.00 L500.00,80.00 L0.00,80.00 Z"></path>
    </svg> 
    :
    <svg viewBox="0 40 500 40" preserveAspectRatio="none" className="wave" style={{ transform: 'rotate(180deg)' }}>
        <path d="M0.00,70.00 C130.07,0.0 275.67,123.70 500.00,60.00 L500.00,80.00 L0.00,80.00 Z"></path>
    </svg>
)
