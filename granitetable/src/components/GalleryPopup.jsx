import React from 'react'
import PopupContainer from './Popup'

export default function GalleryPopup({images, onDisable}) {
    const content = (
        <div className="popup-gallery__body">
            {
                images.map(x => (
                    <div className="item" key={x + Date.now()}>
                        <img src={x} alt="img"></img>
                    </div>
                ))
            }
        </div>
    );
    return (
        <PopupContainer onDisable={onDisable} content={content} />
    )
}