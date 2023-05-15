import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

// add icons to each component that needs them instead of app
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPalette, faCog } from '@fortawesome/free-solid-svg-icons';
// usage -- {<FontAwesomeIcon icon={faSearch} />}


function GptBotTextControls() {
    const { user } = useContext(UserContext)
    const [activeItem, setActiveItem] = useState('');

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
        <>
            <button className="" title="Send Question to Front of Card" onClick={() => setActiveItem('')}>Q</button>
            <button className="" title="Send Response to Back of Card" onClick={() => setActiveItem('')}>R</button>
        </>
    );
}

export default GptBotTextControls;