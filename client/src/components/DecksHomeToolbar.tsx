import React, { useState, useRef, useEffect } from 'react';

function DecksToolbar() {
    const [activeItem, setActiveItem] = useState('');
    const popupsRefs: Record<string, React.RefObject<HTMLDivElement>> = {
        search: useRef<HTMLDivElement>(null),
        palette: useRef<HTMLDivElement>(null),
        gear: useRef<HTMLDivElement>(null),
    };


    const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const popupName = (e.currentTarget as HTMLDivElement).dataset.popup || '';
        setActiveItem(popupName);

        console.log(popupName)
        console.log(activeItem)
    };


    // this is supposed to allow the boxes to be closed by clicking anywhere, but it makes the boxes not show up
    /* useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const popup = document.querySelector('.popup.active');
            if (popup && !popup.contains(event.target as Node)) {
                setActiveItem('');
            }
            console.log(activeItem)
            console.log(popup)
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []); */

    return (
        <div className="container">
            <div className="row3">
                {['search', 'palette', 'gear'].map((popupItem) => (
                    <div
                        key={popupItem}
                        className={`item ${activeItem === popupItem ? 'activeItem' : ''}`}
                        data-popup={popupItem}
                        onClick={handleItemClick}
                        ref={popupsRefs[popupItem]}
                    >
                        {popupItem === 'search' && <i className="fa-solid fa-magnifying-glass"></i>}
                        {popupItem === 'palette' && <i className="fa-solid fa-palette"></i>}
                        {popupItem === 'gear' && <i className="fa-solid fa-gear"></i>}
                    </div>
                ))}
            </div>

            <div className={`popup search ${activeItem === 'search' ? 'active' : ''}`}>
                <div className="popup-box">
                    <div className="popup-content">
                        <h2>keyword search</h2>
                        <h4>search all cards by keywords</h4>
                        <input />
                    </div>
                    <button className="close-btn" onClick={() => setActiveItem('')}>Close</button>
                </div>
            </div>
            <div className={`popup palette ${activeItem === 'palette' ? 'active' : ''}`}>
                <div className="popup-box">
                    <div className="popup-content">
                        <h2>Theme</h2>
                        <p>This is the popup content for the palette.</p>
                    </div>
                    <button className="close-btn" onClick={() => setActiveItem('')}>Close</button>
                </div>
            </div>
            <div className={`popup gear ${activeItem === 'gear' ? 'active' : ''}`}>
                <div className="popup-box">
                    <div className="popup-content">
                        <h2>Preferences</h2>
                        <p>Change your preferences here</p>
                    </div>
                    <button className="close-btn" onClick={() => setActiveItem('')}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default DecksToolbar;