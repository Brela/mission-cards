import React, { useState, useRef, useEffect, useContext } from 'react';
import ColorPicker from '../popups/ColorPicker_Theme';
import { UserContext } from '../../contexts/UserContext';

// add icons to each component that needs them instead of app
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPalette, faCog } from '@fortawesome/free-solid-svg-icons';
// usage -- {<FontAwesomeIcon icon={faSearch} />}


function DecksToolbar() {
    const { user } = useContext(UserContext)
    const [activeItem, setActiveItem] = useState('');
    const popupsRefs: Record<string, React.RefObject<HTMLDivElement>> = {
        search: useRef<HTMLDivElement>(null),
        palette: useRef<HTMLDivElement>(null),
        gear: useRef<HTMLDivElement>(null),
    };

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const popupName = (e.currentTarget as HTMLDivElement).dataset.popup || '';
        setActiveItem(popupName);
    };


    // this is supposed to allow the boxes to be closed by clicking anywhere, but it makes the boxes not show up
    /*     useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                const popup = document.querySelector('.active-item');
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
        }, []);
     */
    return (
        <div className="container">
            <div className="row-3">
                {['search', 'palette', 'gear'].map((popupItem) => (
                    <div
                        key={popupItem}
                        // className={`item ${activeItem === popupItem ? 'active-item' : ''}`}
                        data-popup={popupItem}
                        onClick={handleItemClick}
                        ref={popupsRefs[popupItem]}
                    >
                        {popupItem === 'search' && <FontAwesomeIcon icon={faSearch} />}
                        {popupItem === 'palette' && <FontAwesomeIcon icon={faPalette} />}
                        {popupItem === 'gear' && <FontAwesomeIcon icon={faCog} />}
                    </div>
                ))}
            </div>

            <div className={`popup search ${activeItem === 'search' ? 'active' : ''}`}>
                <div className="popup-box">
                    <div className="popup-content">
                        <h2>Keyword Search</h2>
                        <h4>Coming Soon!</h4>
                        <input />
                    </div>
                    <button className="close-btn" onClick={() => setActiveItem('')}>Close</button>
                </div>
            </div>
            <div className={`popup palette ${activeItem === 'palette' ? 'active' : ''}`}>
                <div className="popup-box">
                    <div className="popup-content">
                        <ColorPicker />
                    </div>
                    <button className="close-btn" onClick={() => setActiveItem('')}>Close</button>
                </div>
            </div>
            <div className={`popup gear ${activeItem === 'gear' ? 'active' : ''}`}>
                <div className="popup-box">
                    <div className="popup-content">
                        <h2>Preferences</h2>
                        <p>Coming Soon!</p>
                    </div>
                    <button className="close-btn" onClick={() => setActiveItem('')}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default DecksToolbar;