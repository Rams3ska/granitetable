import React from 'react'
import '../assets/styles/popup-container.scss'
import { easings } from 'react-animation'

export default function PopupContainer({onDisable, content, width}) {
    const style = {
        animation: `pop-in ${easings.easeOutExpo} 500ms forwards`,
    }

    const blockStyle = {
        maxWidth: `${width}px`
    }
    
    return (
        <div className="popup-popup__container" style={style}>
            <div className="popup-popup__block" style={blockStyle}>
                <div className="popup-popup__head">
                    <span onClick={() => {onDisable()}}>X</span>
                </div>
                <div className="popup-popup__content">{content}</div>
            </div>
        </div>
    )
}