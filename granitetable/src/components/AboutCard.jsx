import React from 'react'

export default function Aboutcard({ name, text }) {
    return (
        <div className="about__block">
            <h2>{name}</h2>
            <div className="about-ass_text" style={{whiteSpace: "pre-line"}}>{text}</div>
        </div>
    )
}
